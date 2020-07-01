const express = require ('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// CRIAÇÃO DE ROTAS DE CADASTRO DE DE LOGIN
router.post('/cadastro', (req, res, next) =>{

  req.connection.query('SELECT * FROM usuarios WHERE email = ?', [req.body.email], (err, result) =>{
    if(err) {return res.status(500).send({err: error})}
    if(result.length > 0 ){
      res.status(409).send({mensagem: "usuário Já cadastrado"})
    } 
    else {
      bcrypt.hash(req.body.senha, 10,(errBcrypt, hash) => {
        if(errBcrypt){
           return res.status(500).send({error: errBcrypt});
        }
        req.connection.query
        ('INSERT INTO USUARIOS (email, senha) VALUES (?, ?)',
          [req.body.email, hash],
          function (err, result){
            if(err) {
              return next(err);
            }
             response = {
              mensagem: 'Usuario Inserido com Sucesso',
              usuarioCriado: {
                id_usuario: result.insertId,
                email: req.body.email,
               
                request: {
                  tipo: 'GET',
                  descricao: 'Sugestão Link para Inserir um Usuário',
                  url: 'http://localhost:4343/usuarios/'
                }
              }
            }            
            return res.status(201).send(response); 
          })
        });
    }
  });  
});

module.exports = router;