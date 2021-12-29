const pergunta = require('../models/perguntas');
const data = require('../utils/obterData');
const api = require('../utils/api');
const { sendMessage } = require('../websocket');

module.exports = {

    async index(request, response) {
        let lista = await pergunta.listarPerguntas();
        response.json(lista);
    },

    async store(request, response) {
        let { email_usuario, conteudo } = await request.body;
        let datapost = await data.obterData();
        console.log(email_usuario, conteudo, datapost);
        await pergunta.salvar(email_usuario, conteudo, datapost);
        let emailRecomendado = await api.get('/recomendacao');
        emailRecomendado = emailRecomendado.data;
        response.json(emailRecomendado);
        console.log('RECOMENDAÇÃO => ', emailRecomendado);
        sendMessage('Recomendação', emailRecomendado);

    }
}