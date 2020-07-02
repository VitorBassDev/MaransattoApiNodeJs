const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.postCadastroUsuarios = (req, res, next) => {
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
}

exports.postLogin = (req, res, next) =>{
  req.connection.query('SELECT * FROM usuarios WHERE email = ?', 
    [req.body.email], 
      (err, result, fields) => {
        if(err) {return res.status(500).send({err: error})}
        
        if(result.length < 1 ){
        return res.status(401).send({mensagem: "Não Autorizado - Falha na Autenticação"});
      }
        bcrypt.compare(req.body.senha, result[0].senha, (err, results) =>{
          if(err){
            return res.status(401).send({mensagem: "Não Autorizado - Falha na Autenticação"});
          }
          if(results) {
              let token = jwt.sign ({
              id_usuario: result[0].id_usuario,
              email: result[0].email
            }, 
            process.env.JWT_KEY,
            {
              expiresIn: "1h",
            });

            return res.status(200).send({
              mensagem: "Autenticado com Sucesso",
              token: token
            });

          }
          return res.status(401).send({mensagem: "Não Autorizado - Falha na Autenticação"});
        });  
    });
}