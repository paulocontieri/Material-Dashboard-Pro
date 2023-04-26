// Importe o pacote "moment" para manipulação de datas
const moment = require('moment');

// Função para converter uma data para o formato brasileiro
const dateHelper = (date) => {
  // Use o momento para formatar a data no padrão brasileiro (DD/MM/YYYY)
  return moment(date).format('DD/MM/YYYY');
};

// Exporte a função para que ela possa ser utilizada em outros arquivos
module.exports = dateHelper