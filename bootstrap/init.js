const config = require('../config/default.json');
const { Client } = require('pg');
const { Sequelize } = require('sequelize');
const URL = require('url').URL


return initialize();

async function initialize() {

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
    
    // Valido si existe la base de datos a crear (MALDITO POSTGRES PORQUE NO TIENE EL IF NOT EXIST!!!)
    let res = await client.query(`INSERT INTO profiles(id, name, created_at, updated_at) VALUES (1,'Administrador',NOW(),NOW()), (2,'Cliente',NOW(),NOW()), (3,'Afiliado',NOW(),NOW());;`).catch(r => { return false });

    if (res) {

        console.log('Base de datos inicializada');

        client.end();
    
    } else {
        
        console.log('Se pudrio la momia');

    } 

}