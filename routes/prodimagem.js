const express = require ('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb){
      cb(null, './uploads/');
    },
    filename: function(req, file, cb){
      cb(null, new Date().toISOString() + file.originalname);
      //cb(null, file.originalname);
    }
});

/*
const fileFilter = (req, file, cb)=>{
  if(file.mimetype === 'imagem/jpg'){
    cb(null, true);
  } else {
    cb(null, false);
  }
}
*/
const upload = multer ({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  }, 
  //fileFilter: fileFilter
});
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
router.get('/',(req, res, next) => {
  req.connection.query(
    'SELECT * FROM produtos', 
      (err, result) => 
      {
        if(err) {
          return next(err);
        }
          const response = {
            quantidade: result.length,
            produtos: result.map(prod =>{
              return {
                id_produto: prod.id_produto,
                nome: prod.nome,
                preco: prod.preco,
                imagem_produto: prod.imagem_produto,
                  request: {
                    tipo: 'GET',
                    descricao: 'Retorna todos os Produtos',
                    url: 'http://localhost:4343/produtos/' + prod.id_produto
                  }
                }
              })
          }
          return res.status(200).send(response);
  });        
});
     
/**
 * ROTA POST(INSERIR)
 */
router.post('/', upload.single('imagem_produto'), (req , res, next) =>{
    console.log(req.file);
    const produto = 
    {
        nome: req.body.nome,
        preco: req.body.preco,
        produto_imagem: req.file.produto_imagem
    }
    req.connection.query(
      'INSERT INTO produtos (nome, preco, imagem_produto) VALUES (?, ?, ?)', 
      [
        req.body.nome,
        req.body.preco,
        req.file.path
      ], 
        function (err, result){
          if(err) {
            return next(err);
          }
          const response = {
            mensagem: 'Produto Inserido com Sucesso',
            produtoCriado: {
            id_produto: result.id_produto,
            nome: req.body.nome,
            preco: req.body.preco,
            imagem_produto: req.file.path,
            request: {
              tipo: 'POST',
              descricao: 'INSERE UM PRODUTO',
              url: 'http://localhost:4343/produtos/'
            }
          }
        }
      return res.status(201).send(response);
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
          if(err) {
            return next(err);
          }
          const response = {
            mensagem: 'Produto Alterado com Sucesso',
            produtoCriado: {
            id_produto: req.body.id_produto,
            nome: req.body.nome,
            preco: req.body.preco,
            request: {
              tipo: 'PATCH',
              descricao: 'Retorna todos os Produtos',
              url: 'http://localhost:4343/produtos/' + req.body.id_produto
            }
          }
        }
      return res.status(202).send(response);
    }
  )
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
      if(err) {
        return next(err);
      }
        const response = {
          mensagem: 'Produto Removido com Sucesso',
          request: {
              tipo: 'POST',
              descricao: 'INSERE UM PRODUTO',
              url: 'http://localhost:4343/produtos/'
            }
        }
      return res.status(202).send(response);
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
      (err, result) => {
        if(err) {
          return next(err);
        }
          if(result.length == 0){
            return res.status(404).send({
            mensagem: 'ID Não Encontrado | Inexistente'
          });
        }
        const response = {
            produto: {
              id_produto: result[0].id_produto,
              nome: result[0].nome,
              preco: result[0].preco,
              request: {
                tipo: 'GET',
                descricao: 'Retorna um Produto Especifíco',
                url: 'http://localhost:4343/produtos/'
              }
            }
          }
      return res.status(200).send(response);               
    }); 
});

module.exports = router;