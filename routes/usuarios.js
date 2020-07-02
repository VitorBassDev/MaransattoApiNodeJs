const express = require ('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// CRIANDO CAMINHO PARA A CONTROLLER - USUÁRIOS
const UsuariosController = require('../controllers/usuiarios-controller');
// CRIAÇÃO DE ROTAS DE CADASTRO DE DE LOGIN
router.post('/cadastro', UsuariosController.postCadastroUsuarios);


router.post('/login', UsuariosController.postLogin);

module.exports = router;