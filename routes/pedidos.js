const express = require ('express');
const { response } = require('express');
const router = express.Router();

/**
 * CRIAÇÃO DAS ROTAS - PEDIDOS 
 * GET | POST | PATCH | DELETE 
 */

 /**
 * ROTA GET(BUSCAR)
 */
router.get('/', (request, response, next) => {
    return response.status(200).send({
        Metodo_GET: 'Retorna os Pedidos'
    });
});

/**
 * ROTA POST(INSERIR)
 */
router.post('/', (request , response, next) =>{
    return response.status(201).json({
        Metodo_POST: 'Insere um Pedido'
    });
    
});

/**
 * ROTA PATCH(ALTERAR)
 */
router.patch('/', (request, response, next) => {
    return response.status(201).json({
        Metodo_PATCH: 'Altera os Pedidos'
    });
});

/**
 * ROTA DELETE(DELETAR)
 */
router.delete('/', (request, response, next) => {
    return response.status(201).json({
        Metodo_DELETE: 'Deleta os Pedidos'
    });
});


/**
 * Passando Parametros nas ROTAS para realizar GET/BUSCAS
 */
router.get('/:id_pedido', (request, response, next) =>{
    const id = request.params.id_pedido;
    return response.status(200).json({
        Metodo_GET_PARAMETRO: 'Detalhes do Pedido'
        });
    });

module.exports = router;