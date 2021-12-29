const respostas = require('../models/respostas');
const perguntas = require('../models/perguntas');
const data = require('../utils/obterData');
const { sendMessage } = require('../websocket')

module.exports = {
    async index(request, response) {
        let { id_pergunta } = await request.query;
        let lista = await respostas.listarRespostas(id_pergunta);

        return (response.json(lista));
    },

    async store(request, response) {
        let { email_usuario, id_pergunta, conteudo } = await request.body;
        let datapost = data.obterData();
        await respostas.salvar(email_usuario, id_pergunta, conteudo, datapost);
        let email_notificacao = await perguntas.buscaEmailUsuario(id_pergunta);
        console.log('=> => MOSTRAR NOTIFICAÇÃO A ', email_notificacao);
        sendMessage('Notificar_Usuario', email_notificacao);
        return (response.json({ email_usuario, id_pergunta, conteudo, datapost }));
    }
}