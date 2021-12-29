const Sequelize = require('sequelize');

const sequelize = new Sequelize('care_child', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql'
});

const Pergunta = sequelize.define('perguntas',
    {
        email_usuario: {
            type: Sequelize.STRING(45)
        },
        conteudo: {
            type: Sequelize.TEXT
        },
        datapost: {
            type: Sequelize.DATE
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    },
)

//Pergunta.sync();

async function salvar(email_usuario, conteudo, datapost) {
    perg = Pergunta.build({ email_usuario, conteudo, datapost });
    await perg.save({ fields: ['email_usuario', 'conteudo', 'datapost'] })
};

async function listarPerguntas() {
    let lista = await Pergunta.findAll({
        order: [['id', 'DESC']]
    })

    lista = JSON.stringify(lista);
    lista = JSON.parse(lista);

    return lista.sort();
};
async function buscaEmailUsuario(id) {
    let cont = await Pergunta.findAll({
        attributes: ['email_usuario'],
        where: {
            id: id
        }
    });

    cont = JSON.stringify(cont);
    cont = JSON.parse(cont)

    return cont[0];
}

module.exports = { salvar, listarPerguntas, buscaEmailUsuario };