// CRIAÇÃO DO BANCO DE DADOS
// CONEXÃO DO BANCO DE DADOS COM A API
// CONFIGURAÇÃO DE VARIÁVEIS DE AMBIENTE
// CONFIGURAÇÃO DO ARQUIVO DE CONFIGURAÇÃO - NODEMON.JS

const mysql  = require ('mysql');

const pool = mysql.createPool({
    /* Configuração Direta dos dados do banco de dados
    "user": "root",
    "password": "root",
    "database": "ecommerce",
    "host": "localhost",
    "port": 3360
    */

    /* Configuração direta dos dados com variáveis de ambitente */

    "user": process.env.MYSQL_USER,
    "password": process.env.MYSQL_PASSWORD,
    "database": process.env.MYSQL_DATABASE,
    "host": process.env.MYSQL_HOST,
    "port": process.env.MYSQL_PORT
});

exports.pool = pool;

