const usuario = require('../models/usuarios');

module.exports = {
    async store(request, response) {
        console.log(request.body)
        const { nome, sexo, email } = request.body;
        let confereEmail = await usuario.consultaEmail(email);
        console.log(confereEmail);
        if (!confereEmail) {
            await usuario.salvar(nome, sexo, email);
            return response.json({ nome, sexo, email })
        } else {
            console.log('EMAIL JÁ CADASTRADO')
            return response.json({ message: "EMAIL JÁ CADASTRADO" })
        }
    },

    async buscarUsuario(request, response) {
        let { email } = await request.query;
        console.log(email);
        let dados = await usuario.buscarUsuario(email);
        console.log(dados);
        return response.json(dados[0])
    },

    async consultaEmail(request, response) {
        let { email } = request.query;
        console.log(email);
        return (response.json(usuario.confereEmail));
    }
}