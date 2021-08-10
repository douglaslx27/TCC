const respostas = require('../models/respostas');
const data = require('../utils/obterData');

module.exports = {
    async index(request, response) {
        let { id_pergunta } = await request.query;
        console.log(id_pergunta);
        let lista = await respostas.listarRespostas(id_pergunta);

        return (response.json(lista));
    },

    async store(request, response) {
        let { email_usuario, id_pergunta, conteudo } = await request.body;
        let datapost = data.obterData();
        await respostas.salvar(email_usuario, id_pergunta, conteudo, datapost);
        return (response.json({ email_usuario, id_pergunta, conteudo, datapost }));
    }
}