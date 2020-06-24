const express = require ('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
//app.use(cors());

/**
 * BANCO DE DADOS :
 *  CONEXÃO -> POOL
 *  GERENCIAMENTO ->  
 */
pool         = require('./mysql');
MiddlewareDB = require('./middleware_bd');

// CRIAR ROTA
const rotaProdutos = require('./routes/produtos');
const rotaPedidos  = require('./routes/pedidos');
//const rotaServicos = require('./routes/servicos');

//SETAR LOGS
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false})); // apenas arquivos simples
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Header',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }
    next();
});

/**
 * MIDDLEWARE'S
 * 
 * ROTA DE MIDDLEWARE - BANCO DE DADO
 * ativando nosso middleware
 */
app.use(MiddlewareDB(pool));

// SETAR ROTA PARA PRODUTOS
app.use('/produtos' , rotaProdutos);
app.use('/pedidos'  , rotaPedidos);
//app.use('/servicos' , rotaServicos);


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
        mensagem: error.message,      
        }
    });
});

module.exports = app;

