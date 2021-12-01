//  Expected response:
// [
//   { 'id': 1,
//     'name': 'Azucar',
//     'result': true // puede comerlo
//   },
//   { 'id': 2,
//     'name': 'Grasas animales',
//     'result': false // no puede comerlo
//   },
//   { 'id': null,
//     'name': 'Colorante',
//     'result': null // no esta en la base de datos
//   }
// ];
const sequelize = require("sequelize");
const { ocrSpace } = require('ocr-space-api-wrapper');
const { query } = require("express");

async function streamToBase64(stream) {
    const chunks = [];
    return new Promise((resolve, reject) => {
        stream.on("data", (chunk) => chunks.push(chunk));
        stream.on("error", reject);
        stream.on("end", () => resolve(Buffer.concat(chunks).toString('base64')));
    });
}

async function doScan(image) {

    try {
        const response = await ocrSpace(
            'data:image/png;'+image,
            {
                apiKey: process.env.OCR_API,
                language: 'spa',
                isOverlayRequired: false,
                detectOrientation: false,
                scale: false,
                isTable: false,
                OCREngine: 2
            }
        )
        return parseIngredients(response.ParsedResults[0].ParsedText);
    } catch (e) {
        console.log(e);
        return e;
    }
}

async function queryIngredients(db, user_food_preference_id, ingredients) {
    // food_preferences.id as preference_id, food_preferences.name as preference_name,
    let fields = `ingredients.id as id, ingredients.name as name, food_preference_id <> ${user_food_preference_id} OR food_preference_id is NULL as result`;
    let joins = "forbidden_ingredients ON ingredients.id = ingredient_id LEFT OUTER JOIN food_preferences ON food_preference_id = food_preferences.id";
    let queries = ingredients.map(ingredient => {return `SELECT ${fields} FROM ingredients LEFT OUTER JOIN ${joins} ORDER BY levenshtein(ingredients.name, '${ingredient}') ASC LIMIT 1`;})
        
    let opts = { type: sequelize.QueryTypes.SELECT, raw: true };
    let result = (await Promise.all(queries.map(q => {return db.query(q, opts)}))).flat()

    for (let i of ingredients) {
        if (!result.map(r => r.name).includes(i)) {
            result.push({ id: null, name: i, result: null })
        }
    }

    return result;
    /*
    let params = ingredients.map((p) => "%" + p + "%");
    let where_sql = "ingredients.name LIKE ? OR ".repeat(ingredients.length - 1);
    // food_preferences.id as preference_id, food_preferences.name as preference_name,
    let fields = `ingredients.id as id, ingredients.name as name, food_preference_id <> ${user_food_preference_id} OR food_preference_id is NULL as result`;
    let joins = "forbidden_ingredients ON ingredients.id = ingredient_id LEFT OUTER JOIN food_preferences ON food_preference_id = food_preferences.id";
    let q =
        `SELECT ${fields} FROM ingredients LEFT OUTER JOIN ${joins} WHERE  (` +
        where_sql +
        `ingredients.name LIKE ?)`;
    let opts = { replacements: params, type: sequelize.QueryTypes.SELECT, raw: true };
    let result = await db.query(q, opts).then((res) => res);

    for (let i of ingredients) {
        if (!result.map(r => r.name).includes(i)) {
            result.push({ id: null, name: i, result: null })
        }
    }

    return result;
    */
}

// splits a multiline string into a list of strings,
// using `,` and `;` as separator.
function splitIngredients(ingredients) {
    let separators = ["\\,", "\\;"];
    let regexp = new RegExp(separators.join("|"), "g");
    let ingredientList = String(ingredients).split(regexp);
    return ingredientList;
}

function parseIngredients(string) {
    return splitIngredients(string)
        .map((i) => i.toLowerCase())
        .map((i) => removeDescription(i))
        .map((i) => mergeMultiLineIngredient(i))
        .map((i) => removeExtraInformation(i))
        .filter((i) => i != ''); // remove empty strings
}

// takes something like "EMU: Lecitina de soja" and returns "Lecitina de soja"
function removeDescription(ingredient) {
    let ingredient_without_desc = ingredient.split(":")[1] || ingredient;
    return ingredient_without_desc.trim();
}

// takes something like "goma\n xantica" and returns "goma xantica"
function mergeMultiLineIngredient(ingredient) {
    let singleLineIngredient = ingredient
        .split("\n")
        .join(" ")
        .replace(/\s+/g, " ")
        .trim();
    return singleLineIngredient;
}

function removeExtraInformation(ingredient) {
    // remove dots
    let withoutDots = ingredient.split(".")[0] || ingredient;
    // remove extra information
    let withoutParens = withoutDots.split("(")[0] || withoutDots;
    // remove mass numbers
    let withoutMass = withoutParens.split(/[0-9]/)[0];
    return withoutMass.trimEnd();
}

let handler = (app) => {

    const db = app.get("sequelizeClient");
    return async(req, res) => {
        let scannedText = "";
        try {
            scannedText = await streamToBase64(req).then((image) => {
                return doScan(image);
            });

            let user_food_preference = req.user.food_preference.id
            let result = await queryIngredients(db, user_food_preference, scannedText);

            res
                .writeHead(200, { "Content-Type": "application/json" })
                .end(JSON.stringify(result));
        } catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    };
};

module.exports = {
    handler: handler,
    removeExtraInformation: removeExtraInformation,
    removeDescription: removeDescription,
    mergeMultiLineIngredient: mergeMultiLineIngredient,
    splitIngredients: splitIngredients,
    parseIngredients: parseIngredients
};
