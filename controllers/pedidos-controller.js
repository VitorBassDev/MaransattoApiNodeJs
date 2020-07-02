exports.getPedidos = (req, res, next) => {
  req.connection.query(
    'SELECT * FROM pedidos', 
      (err, result) => 
      {
        if(err) {
          return next(err);
        }
        const response = {
          quantidade: result.length,
          pedidos: result.map(pedido =>{
            return {
              id_pedido: pedido.id_pedido,
              id_produto: pedido.produto_id_produto,
              quantidade: pedido.quantidade,
                request: {
                  tipo: 'GET',
                  descricao: 'Retorna todos os produtos',
                  url: 'http://localhost:4343/pedidos/' + pedido.id_pedido
                }
              }                                                                                                                                                                                                                                                                                                                                   
            })
          }
        return res.status(200).send(response);
  });
}

exports.postPedidos = (req, res, next) =>{
  req.connection.query(
    'INSERT INTO pedidos (produto_id_produto, quantidade) VALUES (?, ?)', 
    [
      req.body.id_produto,
      req.body.quantidade
    ], 
      function (err, result){
        if(err) {
          return next(err);
        }
        const response = {
          mensagem: 'Pedido Inserido com Sucesso',
          pedidoCriado: {
            id_pedido: result.id_pedido,
            id_produto: req.body.id_produto,
            quantidade: req.body.quantidade,
            request: {
              tipo: 'GET',
              descricao: 'Sugestão Link para Inserir um Pedido',
              url: 'http://localhost:4343/pedidos/'
            }
          }
        }
      return res.status(201).send(response);
    });
}

exports.patchPedido = (req, res, next) =>{
  const produto = 
  {
    produdo_id_produto: req.body.produdo_id_produto,
    quantidade: req.body.quantidade
  }
  req.connection.query(
    'UPDATE pedidos SET produto_id_produto = ?, quantidade = ? WHERE id_pedido = ?', 
      [
        req.body.id_produto,
        req.body.quantidade,
        req.body.id_pedido,
      ],   
      function (err, result)  {
        if(err) {
          return next(err);
        }
        
        req.body.id_pedido = result.id_pedido
        const response = {
          mensagem: 'Produto Alterado com Sucesso',
          produtoAlterado: {
          id_pedido: result.id_pedido,
          id_produto: req.body.id_produto,
          quantidade: req.body.quantidade,
          request: {
            tipo: 'PATCH',
            descricao: 'Retorna todos os Pedidos (Após Alterar)',
            url: 'http://localhost:4343/produtos/' + req.body.id_pedido
          }
        }
      }
    return res.status(202).send(response);
  }
)

}

exports.deletePedidos = (req, res, next) => {
  req.connection.query(
    'DELETE FROM pedidos WHERE id_pedido = ?', 
    [
    req.body.id_pedido
    ],
    
    function (err, resultado)  {
      if(err) {
        return next(err);
      }
      const response = {
        mensagem: 'Pedido Removido com Sucesso',
        request: {
          tipo: 'POST',
          descricao: 'IClick para Inserir um novo Pedido',
          url: 'http://localhost:4343/pedidos/',
            body: {
              produto_id_produto: 'Number',
              quantidade: 'Number'
              }
          }
      }
    return res.status(202).send(response);
  });
}

exports.getIdPedidos = (req, res, next) =>{
  req.connection.query(
    'SELECT * FROM pedidos WHERE id_pedido = ?;', 
      [
        req.params.id_pedido
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
          mensagem: 'Pesquisa por id:',
          produto: {
            id_pedido: result[0].id_pedido,
            id_produto: result[0].produto_id_produto,
            quantidade: result[0].quantidade,
            request: {
              tipo: 'GET',
              descricao: 'Retorna um Pedido Especifíco do ID passado',
              url: 'http://localhost:4343/pedido/'
            }
          }
        }
      return res.status(200).send(response);               
    });
}