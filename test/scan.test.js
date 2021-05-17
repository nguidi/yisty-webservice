const assert = require("assert").strict;

// splits a multiline string into a list of strings,
// using `,` and `;` as separator.
function splitIngredients(ingredients) {
    let separators = ["\\,", "\\;"];
    let regexp = new RegExp(separators.join("|"), "g");
    let ingredientList = String(ingredients).split(regexp);
    return ingredientList
        .map((i) => i.toLowerCase())
        .map((i) => removeDescription(i))
        .map((i) => mergeMultiLineIngredient(i))
        .map((i) => removeExtraInformation(i));
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

describe("Scanning functions", () => {
    it("mergeMultiLineIngredient removes \n", async() => {
        assert.equal(
            mergeMultiLineIngredient("goma\n     xantica"),
            "goma xantica"
        );
    });

    it("removeDescription removes EMU section", async() => {
        assert.equal(
            removeDescription("EMU: lecitina de soja"),
            "lecitina de soja"
        );
    });

    it("removeExtraInformation removes trailing information", async() => {
        let str = "rojo carmin. contiene gluten de";
        assert.equal(removeExtraInformation(str), "rojo carmin");
    });

    it("removeExtraInformation removes parens", async() => {
        let str = "Riboflavina (82) 13 mg/kg";
        assert.equal(removeExtraInformation(str), "Riboflavina");
    });

    it("removeExtraInformation removes amount of ingredient", async() => {
        let str = "acido folico 22 mg/kg";
        assert.equal(removeExtraInformation(str), "acido folico");
    });

    it("splitIngredients works ok", async() => {
        let ingredients = `GALLETITAS DULCES CON RELLENO SA
        FRAMBUESA - Ingredientes: Harina de trigo enríquá£lf
        por ley 25.630 (hierro 30 mg/kg, ácido fólico 22 mg/kg,
        Tiamina (81) 6.3 mg/kg, Riboflavina (82) 13 mg/kg,
        Niacina (83) 13.0 mg/kg), Jarabe de maíz de alta fructosa,
        azúcar, oleomargarina, sal, ESP: carragenina, goma
        xántica, RAI: Bicarbonato de sodio, Bicarbonato de amonio,
        EMU: Lecitina de soja, ARO: Aromatizante artificial sabor
        frambuesa, COL: Rojo Carmín. CONTIENE GLUTEN DE`;

        expected = [
            "harina de trigo enríquá£lf por ley",
            "ácido fólico",
            "tiamina",
            "riboflavina",
            "niacina",
            "jarabe de maíz de alta fructosa",
            "azúcar",
            "oleomargarina",
            "sal",
            "carragenina",
            "goma xántica",
            "bicarbonato de sodio",
            "bicarbonato de amonio",
            "lecitina de soja",
            "aromatizante artificial sabor frambuesa",
            "rojo carmín",
        ];
        assert.deepEqual(expected, splitIngredients(ingredients));
    });
});
