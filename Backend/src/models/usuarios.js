const Sequelize = require('sequelize');

const sequelize = new Sequelize('care_child', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql'
})

const Usuario = sequelize.define('usuarios',
    {
        nome: {
            type: Sequelize.STRING(45)
        },
        sexo: {
            type: Sequelize.STRING(1)
        },
        email: {
            type: Sequelize.STRING(45)
        },
        imagem: {
            type: Sequelize.TEXT
        }
    },

    {
        freezeTableName: true,
        timestamps: false
    },
);
//Usuario.sync();

async function salvar(nome, sexo, email, imagem) {
    const user = Usuario.build({ nome, sexo, email, imagem });

    console.log(user instanceof Usuario);
    console.log(user.nome);
    await user.save({ fields: ['nome', 'sexo', 'email', 'imagem'] });
};

async function consultaEmail(email) {
    let cont = await Usuario.findAll({
        attributes: ['email'],
        where: {
            email: email
        }
    });

    cont = JSON.stringify(cont);
    cont = JSON.parse(cont)

    return cont[0];

}

async function buscarUsuario(email) {
    let user = await Usuario.findAll({
        attributes: [
            'nome',
            'sexo',
            'email',
            'imagem'
        ],

        where: {
            email: email
        }
    });
    user = JSON.stringify(user);
    user = JSON.parse(user);

    return user;
}

async function update(nome, sexo, email, imagem) {
    await Usuario.update(
        {
            nome: nome, sexo: sexo, imagem: imagem
        },
        {
            where: { email: email }
        }
    )
}

async function destroy(email) {
    await Usuario.destroy(
        {
            where: {
                email: email
            }
        }
    )
}

module.exports = { salvar, consultaEmail, buscarUsuario, update, destroy };