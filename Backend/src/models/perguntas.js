const Sequelize = require('sequelize');
const api = require('../utils/api')

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
    //console.log(perg instanceof Pergunta);
    //console.log(perg.email_usuario);
    await perg.save({ fields: ['email_usuario', 'conteudo', 'datapost'] })
};

async function listarPerguntas() {
    let lista = await Pergunta.findAll()

    lista = JSON.stringify(lista);
    lista = JSON.parse(lista);
    //let lista = await api.get('/perguntas');

    //console.log(lista);
    return lista.sort();
};

module.exports = { salvar, listarPerguntas };