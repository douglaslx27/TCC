function obterData() {
    let data = new Date();

    let dia = data.getDate();
    let mes = data.getMonth();
    let ano = data.getFullYear();

    let hora = data.getHours();
    let minutos = data.getMinutes();

    let dataTime = ano + '-' + (mes + 1) + '-' + dia + ' ' + (hora - 3) + ':' + minutos;

    return dataTime;
}

module.exports = { obterData };