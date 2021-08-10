const pergunta = require('../models/perguntas');
const data = require('../utils/obterData');

module.exports = {

    async index(request, response) {
        let lista = await pergunta.listarPerguntas();
        response.json(lista);

        return (lista)
    },

    async store(request, response) {
        let { email_usuario, conteudo } = await request.body;
        let datapost = await data.obterData();
        await pergunta.salvar(email_usuario, conteudo, datapost);
        response.json({ email_usuario, conteudo, datapost });
    }
}