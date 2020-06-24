const express = require ('express');
const router = express.Router();

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
router.get('/', (req, res, next) => {
    req.connection.query(
        'SELECT * FROM produtos',
            (err, resultado) => 
            {
                if(err) 
                    return next(err);
                        return res.json({
                            produtos: resultado
                        });  
    });
});
     
/**
 * ROTA POST(INSERIR)
 */
router.post('/', (req , res, next) =>{
    const produto = 
    {
        nome: req.body.nome,
        preco: req.body.preco
    }
    req.connection.query(
        'INSERT INTO produtos (nome, preco) VALUES (?, ?)', 
        [
            req.body.nome,
            req.body.preco
        ], 
            function (err, resultado)
            {
            if(err) 
                return next(err);
                    return res.json({
                        Mensagem: 'Produto Inserido com Sucesso',
                        ProdutoCriado: produto,
                        id_produto: resultado.insertId
                    });
    });
});

/**
 * ROTA PATCH(ALTERAR)
 */
router.patch('/', (req, res, next) => {
   
    const produto = 
    {
        nome: req.body.nome,
        preco: req.body.preco
    }

    req.connection.query(
        'UPDATE produtos SET nome = ?, preco = ? WHERE id_produto = ?', 
            [
                req.body.nome,
                req.body.preco, 
                req.body.id_produto
            ], 
                function (err, resultado)  {
        
                if(err) 
                    return next(err);
                        return res.json({
                            Mensagem: 'Produto Alterado com Sucesso',
                            ProdutoCriado: produto,
                            id_produto: resultado.insertId
                        })    
    });
});

/**
 * ROTA DELETE(DELETAR)
 */
router.delete('/', (req, res, next) => {
    req.connection.query(
        'DELETE FROM produtos WHERE id_produto = ?', 
            [
                req.body.id_produto
            ], 
                function (err, resultado)  {
        
                if(err) 
                    return next(err);
                        return res.json({
                        Mensagem: 'Produto Excluido com Sucesso',
                    })    
    });
});


/**
 * Passando Parametros nas ROTAS para realizar GET/BUSCAS
 */
router.get('/:id_produto', (req, res, next) =>{
    req.connection.query(
        'SELECT * FROM produtos WHERE id_produto = ?;', 
            [
                req.params.id_produto
            ], 
                (err, resultado) => {
                    if(err)
                        return next(err);
                            return res.json({
                            produtos: resultado
                         });  
                         
    }); 
});

module.exports = router;