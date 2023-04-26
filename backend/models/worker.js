const mongoose = require("mongoose");

const WorkerSchema = new mongoose.Schema({
  filial: {
    type: String,
    required: true
  },

  departamento: {
    type: String,
    required: true
  },

  cargo: {
    type: String,
    required: true
  },

  lider: {
    type: String,
    required: true
  },

  nome: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  adress: {
    type: String,
    required: true
  },

});

const Worker = mongoose.model('Worker', WorkerSchema);

module.exports = Worker;
