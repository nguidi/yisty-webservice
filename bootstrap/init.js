const config = require('../config/default.json');
const { Client } = require('pg');
const URL = require('url').URL
const path = require('path');
const fs = require('fs');

// Path al ejecutable + carpeta data
const rootFolder = path.join(__dirname, 'data');

const files = [
    { name: 'profiles', pks: ['id'] },
    { name: 'food_preferences', pks: ['id'] },
    { name: 'ingredients', pks: ['id'] },
    { name: 'manufacturers', pks: ['id'] },
    { name: 'categories', pks: ['id'] },
    { name: 'affiliate_shops', pks: ['id'] },
    { name: 'products', pks: ['id'] },
    { name: 'affiliate_shops_products', pks: ['affiliate_shop_id', 'product_id'] },
    { name: 'product_ingredients', pks: ['ingredient_id', 'product_id'] },
    { name: 'forbidden_ingredients', pks: ['food_preference_id', 'ingredient_id'] },
    { name: 'users', pks: ['id'] },
    { name: 'pending_products', pks: ['id'] },
    { name: 'pending_ingredients', pks: ['id'] },
    { name: 'user_scans', pks: ['id'] },
    { name: 'user_complaints', pks: ['id'] },
    { name: 'complaint_ingredients', pks: ['ingredient_id', 'user_complaint_id'] },
    { name: 'user_affiliate_shops', pks: ['user_id', 'affiliate_shop_id'] },
    { name: 'products_food_preferences', pks: ['id'] }
]

const rawData = files.map(f => {

    console.log(`Interpretando el archivo ${f.name}`);

    let file = fs.readFileSync(path.join(rootFolder, `${f.name}.json`));

    return Object.assign(f, { data: JSON.parse(file) });
})

const tables = rawData.map(d => {
    return Object.assign(d, { queries: d.data.map(rd => { return { id: rd.id, select: getSelectQuery(d.name, rd, d.pks), insert: getInsertQuery(d.name, rd), update: getUpdateQuery(d.name, rd, d.pks) } }) })
});

return initialize();

async function initialize() {

    let errors = [];

    // Parseo las credenciales del archivo de configuracion de feathers
    let credentials = new URL(config.postgres);
    let database = credentials.pathname.split('/').pop();

    console.log(`Inicializando \'${database}\'`);

    // Inicializo la conexion con la base de datos
    let client = new Client({
        user: credentials.username,
        host: credentials.hostname,
        password: credentials.password,
        port: credentials.port,
        database: database
    });

    client.connect();

    for (let table of tables) {

        // Inidico que estoy por insertar/actualizar
        console.log(`Inicializando la tabla: ${table.name}`);

        for (let data of table.queries) {

            console.log(`Validando si existe el recurso con id: ${data.id}`)
            console.log(`Usando la consulta SQL: ${data.select}`)

            // Verifico si existe el ID
            let res = await client.query(data.select).catch(r => { errors.push(r); return false });

            // Si tengo 0 rows, no logre encontrar el ID, por ende, inserto el nuevo dato, de lo contrario actualizo
            if (res && !res.rowCount) {

                console.log(`El elemento no existe. Insertando el registro.`)
                console.log(`Usando la consulta SQL: ${data.insert}`)

                let ires = await client.query(data.insert).catch(r => { errors.push(r); return false });

                if (ires && ires.rowCount > 0) {
                    console.log(`El elemento insertado correctamente.`)
                } else {
                    console.log(`Error al insertar.`)
                }

            } else {

                console.log(`El elemento ya existe. Actualizando el registro.`)
                console.log(`Usando la consulta SQL: ${data.update}`)

                let ures = await client.query(data.update).catch(r => { errors.push(r); return false });

                if (ures && ures.rowCount > 0) {
                    console.log(`El elemento actualizado correctamente.`)
                } else {
                    console.log(`Error al actualizar.`)
                }

            }

        }

    }

    console.log(`Proceso Finalizado. Errores ${errors.length}.`);

    errors.forEach(console.log);

    client.end();

}


function getSelectQuery(dbName, data, pks) {

    let where_pairs = []

    pks.forEach(key => {
        where_pairs.push(`${key} = ${data[key]}`);
    })

    let where = where_pairs.join(' AND ');

    return `SELECT FROM ${dbName} WHERE ${where};`

}


function getInsertQuery(dbName, data) {

    let model = '(' + Object.keys(data).join(', ') + ', created_at, updated_at)';

    let values = '(' + Object.values(data).map(v => { return (typeof v == "string") ? "\'" + v + "\'" : v }).join(', ') + ', NOW(), NOW())';

    return `INSERT INTO ${dbName} ${model} VALUES ${values};`

}


function getUpdateQuery(dbName, data, pks) {

    let pairs = [];

    for (var key in data) {
        if (key != 'id') {
            let value = (typeof data[key] == "string") ? "\'" + data[key] + "\'" : data[key];
            pairs.push(`${key} = ${value}`)
        }
    }

    pairs.push('updated_at = NOW()');

    let values = pairs.join(', ')

    let where_pairs = []

    pks.forEach(key => {
        where_pairs.push(`${key} = ${data[key]}`);
    })

    let where = where_pairs.join(' AND ');

    return `UPDATE ${dbName} SET ${values} WHERE ${where};`

}
