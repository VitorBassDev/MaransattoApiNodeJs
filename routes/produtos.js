const express = require ('express');
const { response } = require('express');
const router = express.Router();

/**
 * CRIAÇÃO DAS ROTAS - PRODUTOS 
 * GET | POST | PATCH | DELETE 
 */

 /**
 * ROTA GET(BUSCAR)
 */
router.get('/', (request, response, next) => {
    return response.status(200).send({
        Metodo_GET: 'Retorna os Produtos'
    });
});

/**
 * ROTA POST(INSERIR)
 */
router.post('/', (request , response, next) =>{
    return response.status(201).json({
        Metodo_POST: 'Insere um Produtos'
    });
    
});

/**
 * ROTA PATCH(ALTERAR)
 */
router.patch('/', (request, response, next) => {
    return response.status(201).json({
        Metodo_PATCH: 'Altera os Produtos'
    });
});

/**
 * ROTA DELETE(DELETAR)
 */
router.delete('/', (request, response, next) => {
       
    return response.status(201).json({
        Metodo_DELETE: 'Deleta os Produtos'
    });
});


/**
 * Passando Parametros nas ROTAS para realizar GET/BUSCAS
 */
router.get('/:id_produto', (request, response, next) =>{
    const id = request.params.id_produto;
    
    if(id == 'especial'){
        return response.status(200).json({
            Metodo_GET_PARAMETRO: 'Usando a Rota POST dentro da Rota de Produtos com Parametro',
            id: id
        });
    } else{
        return response.status(200).json({
            Metodo_GET_PARAMETRO: 'ID não encontrado '
        });
    }
});

module.exports = router;