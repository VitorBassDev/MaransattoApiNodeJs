// CRIAÇÃO DO BANCO DE DADOS
// CONEXÃO DO BANCO DE DADOS COM A API
// CONFIGURAÇÃO DE VARIÁVEIS DE AMBIENTE
// CONFIGURAÇÃO DO ARQUIVO DE CONFIGURAÇÃO - NODEMON.JS

const mysql  = require ('mysql');
const { connect } = require('./app');

// CRIAR USUÁRIO DO MYSQL NOME: nodejs SENHA: root
// ATRIBUIR permissões ao usuário
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'nodejs',
    password : 'root',
    database : 'ecommerce'
  });
  
  connection.connect(function(err){
      if(err){
          console.error('Erro Conectar, verifique sua conexão: ' + err.stack);
          return;
      }
      console.log('connection is id ' + connection.threadId);
  });

  exports.connection = connection;
  /*
      connection.query('SELECT * FROM produtos', function (err, rows, fields){
          if(!err){
              console.log('Resultado', rows);
          } else {
              console.log('Erro ao Realizar a consulta');
          }
      });

exports.connection = connection;

const pool = mysql.createPool({
     Configuração Direta dos dados do banco de dados
    "user": "root",
    "password": "root",
    "database": "ecommerce",
    "host": "localhost",
    "port": 3360
    */

    /* Configuração direta dos dados com variáveis de ambitente 
    
    "host": process.env.MYSQL_HOST,
    "database": process.env.MYSQL_DATABASE,
    "user": process.env.MYSQL_USER,
    "password": process.env.MYSQL_PASSWORD,   
    "port": process.env.MYSQL_PORT
});

exports.pool = pool;
*/




/*

// ESSE CÓDIGO TAMBÉM FUNCIONA
connection.connect();
 
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
 
connection.end();
*/

