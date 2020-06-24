const express = require ('express');
const router = express.Router();

/**
 * CRIAÇÃO DAS ROTAS - PRODUTOS 
 * GET | POST | PATCH | DELETE 
 */

 /**
 * ROTA GET(BUSCAR)
 */
router.get('/', (req, res, next) => {

    // A COXEXÃO É ABERTA ATRAVÉS DA ROTA
    // ABRIR CONEXÃO COM O BANCO DE DADOS
    req.connection.query('SELECT * FROM produtos', (err, resultado) => {
        if(err) return next(err);
        return res.json({
            produtos: resultado
        });  
        // CONEXÃO É DEVOLVIDA AO POOL E ENCERRADA ATRAVES DO MIDDLWARE
    });
});
     
/**
 * ROTA POST(INSERIR)
 */
router.post('/', (req , res, next) =>{
    const produdo = {
        nome: req.body.nome,
        preco: req.body.preco
    }
    // A COXEXÃO É ABERTA ATRAVÉS DA ROTA
    // ABRIR CONEXÃO COM O BANCO DE DADOS
    req.connection.query(
    'INSERT INTO produtos (nome, preco) VALUES (?, ?)', 
    [req.body.nome, req.body.preco], function (err, resultado)  {
    
    if(err) return next(err);
        return res.json({
            Mensagem: 'Produto Inserido com Sucesso',
            ProdutoCriado: produdo,
            id_produto: resultado.insertId
        })    
    });
    
    /*
    return req.status(201).json({
		Metodo_POST: 'Produto Inserido com Sucesso',
		id_produto: resultado.insertId
    });
    */
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