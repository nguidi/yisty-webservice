const config = require('../config/default.json');
const { Client } = require('pg');
const { Sequelize } = require('sequelize');
const URL = require('url').URL


initialize();

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
        port: credentials.port
    });

    client.connect();
    
    // Valido si existe la base de datos a crear (MALDITO POSTGRES PORQUE NO TIENE EL IF NOT EXIST!!!)
    let res = await client.query(`SELECT FROM pg_database WHERE datname = \'${database}\';`).catch(r => { return false });
    

    // Si tengo 0 rows, debo crear la db
    if (res && !res.rowCount) {

        console.log(`No se encontro la DB \'${database}\'.. Creando...`);

        // Creo la db
        res = await client.query(`CREATE DATABASE ${database};`).catch(r => { return r });

        if (res) {

            console.log('Base de datos creada... Inicializando DB...');

            client.end();

            /*

            // Inicializo la conexion con la base de datos creada  
            client = new Client({
                user: credentials.username,
                host: credentials.hostname,
                password: credentials.password,
                port: credentials.port,
                database: database
            });

            client.connect();

            

            for (var i=0; i < tables.length; i++) {

                let table = tables[i];

                let tRes = await table.initTable(client);

                if (tRes instanceof Error) {
                    console.log(`Ocurrio un error al crear la tabla ${table.name}...`)
                    console.log(tRes)
                    return;
                } else  {
                    console.log(`Tabla ${table.name} creada correctamente...`)
                } 

            }
            */
            

        } else {

            console.log('Ocurrio un error al crear la db...');

        }

    } else {

        console.log('No hay nada para hacer...');

    }

    client.end()
    
}