const express = require ('express');
const router = express.Router();

// CRIANDO CAMINHO PARA A CONTROLLER - PEDIDOS
const PedidosController = require('../controllers/pedidos-controller');
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
router.get('/', PedidosController.getPedidos );       
/**
 * ROTA POST(INSERIR)
 */
router.post('/', PedidosController.postPedidos);

/**
 * ROTA PATCH(ALTERAR)
 */
router.patch('/', PedidosController.patchPedido);

/**
 * ROTA DELETE(DELETAR)
 */
router.delete('/', PedidosController.deletePedidos);

/**
 * Passando Parametros nas ROTAS para realizar GET/BUSCAS
 */
router.get('/:id_pedido', PedidosController.getIdPedidos);
module.exports = router;