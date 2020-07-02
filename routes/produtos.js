const express = require ('express');
const router = express.Router();
const login = require('../middleware/login');


// CRIANDO CAMINHO PARA A CONTROLLER - PRODUTOS
const ProdutosController = require('../controllers/produtos-controller');

/**
 * CRIAÇÃO DAS ROTAS - PRODUTOS 
 * GET | POST | PATCH | DELETE 
 * req.connection ( 
 *                  A COXEXÃO É ABERTA ATRAVÉS DA ROTA
 *                  ABRIR CONEXÃO COM O BANCO DE DADOS
 *                  CONEXÃO É DEVOLVIDA AO POOL E ENCERRADA ATRAVES DO MIDDLWARE
 *                )
 */

 /**
 * ROTA GET(BUSCAR)
 */
router.get('/', ProdutosController.getProdutos);
     
/**
 * ROTA POST(INSERIR)
 */
router.post('/', login.obrigatorio, ProdutosController.postProdutos);

/**
 * ROTA PATCH(ALTERAR)
 */
router.patch('/', login.obrigatorio, ProdutosController.patchProdutos);

/**
 * ROTA DELETE(DELETAR)
 */
router.delete('/', login.obrigatorio, ProdutosController.deletProdutos);

/**
 * Passando Parametros nas ROTAS para realizar GET/BUSCAS
 */
router.get('/:id_produto', (req, res, next) =>{
  
});

module.exports = router;