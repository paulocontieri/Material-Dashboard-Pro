const mongoose = require("mongoose");

const PatrimonySchema = new mongoose.Schema({
  tipoPatrimonio: {
    type: String,
    required: true
  },

  etiqueta: {
    type: Number,
    required: true
  },

  nomePatrimonio: {
    type: String,
    required: true
  },

  marcaPatrimonio: {
    type: String,
    required: true
  },

  fornecedor: {
    type: String,
    required: true
  },

  enderecoFornecedor: {
    type: String,
    required: true
  },

  filial: {
    type: String,
    required: true
  },

  local: {
    type: String,
    required: true
  },
  
  centroCusto: {
    type: String,
    required: true
  },

  status: {
    type: String,
    required: true
  },

  aquisicao: {
    type: String,
    required: true
  },

  garantia: {
    type: String,
    required: true
  },

  depreciacao: {
    type: String,
    required: true
  },

  observacao: {
    type: String,
    required: true
  },

});

const Patrimony = mongoose.model('Patrimony', PatrimonySchema);

module.exports = Patrimony;