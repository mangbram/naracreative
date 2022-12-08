const  { Client }  = require('pg')
require('dotenv').config();
const{
    USER,
    HOST,
    DATABASE,
    PASSWORD,
    PORT_DB
} = process.env


const databaseConfig = new Client({
    host: HOST,
    user: USER,
    database: DATABASE,
    port: PORT_DB,
    password: PASSWORD
})

module.exports = databaseConfig;