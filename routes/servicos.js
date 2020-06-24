const express = require ('express');
const router = express.Router();


router.get('/', (req, res, next) =>{
/*  // não me importa de onde vem a conexão, só preciso de uma conexão!
  req.connection.query('SELECT * FROM produtos', (err, products) => {

      if(err) return next(err);
      res.json(products);

      // não preciso me preocupar em devolver a conexão para o pool
  });
  */
 });

