const usuario = require('../models/usuarios');

module.exports = {
    async store(request, response) {
        console.log(request.body)
        const { nome, sexo, email, imagem } = request.body;
        let confereEmail = await usuario.consultaEmail(email);

        if (!confereEmail) {
            await usuario.salvar(nome, sexo, email, imagem.base64);
            return response.json({ nome, sexo, email, imagem })
        } else {
            return response.json({ message: "EMAIL JÁ CADASTRADO" })
        }
    },

    async buscarUsuario(request, response) {
        let { email } = await request.query;
        let dados = await usuario.buscarUsuario(email);
        return response.json(dados[0])
    },

    async consultaEmail(request, response) {
        let { email } = request.query;
        console.log(email);
        return (response.json(usuario.confereEmail));
    }
}