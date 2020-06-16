const express = require ('express');
//const { response } = require('express');
const app = express();
// MONITORAR LOGS
const morgan = require('morgan');

// CRIAR ROTA
const rotaProdutos = require('./routes/produtos');
const rotaPedidos = require ('./routes/pedidos');

//SETAR LOGS
app.use(morgan('dev'));

// SETAR ROTA PARA PRODUTOS
app.use('/produtos', rotaProdutos);
app.use('/pedidos', rotaPedidos);

// TRATAR ERROS | TRATAR ERROS DE ROTAS(QUANDO A ROTA NÃO FOR ENCONTRADA)
app.use((request, response, next) =>{
    const erro = new Error('Operação não encontrada');
    erro.status = 404;
    next(erro);
});

app.use((error, request, response, next) =>{
    response.status(error.status || 500);
    return response.send({
        erro: {
        mensagem: error.message
        }
    });
});

module.exports = app;

