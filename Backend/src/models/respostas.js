const Sequelize = require('sequelize');

const sequelize = new Sequelize('care_child', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql'
});

const Resposta = sequelize.define('respostas',
    {
        email_usuario: {
            type: Sequelize.STRING(45)
        },
        id_pergunta: {
            type: Sequelize.INTEGER
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

//Resposta.sync();

async function salvar(email_usuario, id_pergunta, conteudo, datapost) {
    res = Resposta.build({ email_usuario, id_pergunta, conteudo, datapost });
    console.log(res instanceof Resposta);
    console.log(res.id);
    await res.save({ fields: ['email_usuario', 'id_pergunta', 'conteudo', 'datapost'] })
};

async function listarRespostas(id_pergunta) {
    let lista = await Resposta.findAll({
        where: {
            id_pergunta: id_pergunta
        }
    })

    lista = JSON.stringify(lista);
    lista = JSON.parse(lista);

    console.log(lista);
    return lista;
};

module.exports = { salvar, listarRespostas };