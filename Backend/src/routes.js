const { Router } = require('express');
const usuarioController = require('./controllers/usuariosController')
const perguntasController = require('./controllers/perguntasController')
const respostasController = require('./controllers/respostasController')
const routes = Router();

routes.post('/usuarios', usuarioController.store);
routes.get('/usuarios', usuarioController.buscarUsuario);
//routes.get('/usuarios', usuarioController.consultaEmail);

routes.get('/perguntas', perguntasController.index);
routes.post('/perguntas', perguntasController.store);

routes.get('/respostas', respostasController.index);
routes.post('/respostas', respostasController.store);

module.exports = routes;