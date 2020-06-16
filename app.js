const express = require ('express');
const { response } = require('express');
const app = express();

// CRIAR ROTA
const rotaProdutos = require('./routes/produtos');
const rotaPedidos = require ('./routes/pedidos');

// SETAR ROTA PARA PRODUTOS
app.use('/produtos', rotaProdutos);
app.use('/pedidos', rotaPedidos);

module.exports = app;

