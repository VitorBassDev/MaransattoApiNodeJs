const express = require ('express');
const { response } = require('express');
const router = express.Router();

// SETAR CONFIGURAÇÃO DO MYSQL - USAR O BANCO DE DADOS
const mysql = require ('../mysql').pool;

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

    // ABRIR CONEXÃO COM O BANCO DE DADOS
    mysql.getConnection((error, conn) => {
    
        conn.query(
            // REALIZAR UM INSERT NO BANCO DE DADOS ECOOMERCE NA TABLEA PRODUTOS
            'INSERT INTO produtos (nome, preco) VALUES (?,?)',
            [request.body.nome, request.body.preco ],
                (error, resultado, field) => {
                conn.release();
                    if(error){
                        return response.status(500).send({
                            error: error,
                            response:null
                        });
                    }
                    return response.status(201).json({
                        Metodo_POST: 'Produto Inserido com Sucesso',
                        id_produto: resultado.insertId
                    });
                }
        );
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