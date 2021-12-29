
function formataData(data: string) {
    let dia = data.substring(8, 10);
    let mes = data.substring(5, 7);
    let ano = data.substring(0, 4);

    let hora = data.substring(11, 16);

    let dataHora = hora + " " + dia + "-" + mes + "-" + ano;

    return dataHora;
}

export {
    formataData
};