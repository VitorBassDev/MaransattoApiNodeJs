const express = require ('express');
const router = express.Router();

/**
 * CRIAÇÃO DAS ROTAS - PEDIDOS 
 * GET | POST | PATCH | DELETE 
 */

 /**
 * ROTA GET(BUSCAR)
 */
router.get('/', (req, res, next) => {
    return res.status(200).send({
        Metodo_GET: 'Retorna os Pedidos'
    });
});

/**
 ROTA POST(INSERIR)
 */
router.post('/', (req, res, next) =>{
    return res.status(201).json({
        Metodo_POST: 'Insere um Pedido'
    });
    
});

/**
 * ROTA PATCH(ALTERAR)
 */
router.patch('/', (req, res, next) => {
    return res.status(201).json({
        Metodo_PATCH: 'Altera os Pedidos'
    });
});

/**
 * ROTA DELETE(DELETAR)
 */
router.delete('/', (req, res, next) => {
    return res.status(201).json({
        Metodo_DELETE: 'Deleta os Pedidos'
    });
});


/**
 * Passando Parametros nas ROTAS para realizar GET/BUSCAS
 */
router.get('/:id_pedido', (req, res, next) =>{
    const id = req.params.id_pedido;
    return res.status(200).json({
        Metodo_GET_PARAMETRO: 'Detalhes do Pedido'
        });
    });

module.exports = router;