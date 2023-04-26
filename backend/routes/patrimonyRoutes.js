const router = require("express").Router();
const jwl = require("jsonwebtoken");
const multer = require("multer");


const Patrimony = require("../models/patrimony")
const User = require("../models/user")

// middlewares
const verifyToken = require("../helpers/check-token");

// helpers
const getUserByToken = require("../helpers/get-user-by-token");
const dateHelper = require("../helpers/dateHelper")
const { Router } = require("express");

// create new patrimony
router.post("/", verifyToken, async (req, res) => {
  // req data
  const tipoPatrimonio = req.body.tipoPatrimonio;
  const etiqueta = req.body.etiqueta;
  const nomePatrimonio = req.body.nomePatrimonio;
  const marcaPatrimonio = req.body.marcaPatrimonio;
  const fornecedor = req.body.fornecedor;
  const enderecoFornecedor = req.body.enderecoFornecedor;
  const filial = req.body.filial;
  const local = req.body.local;
  const centroCusto = req.body.centroCusto;
  const status = req.body.status;
  const aquisicao = req.body.aquisicao;
  const garantia = req.body.garantia;
  const depreciacao = req.body.depreciacao;
  const observacao = req.body.observacao;

  // validations
  if(tipoPatrimonio == null || etiqueta == null || nomePatrimonio == null 
    || marcaPatrimonio == null || fornecedor == null || enderecoFornecedor == null
    || filial == null || local == null || centroCusto == null
    || status == null || aquisicao == null || garantia == null
    || depreciacao == null || observacao == null) {
    return res.status(400).json({error: "Por favor, preencha todos os campos!"})
  }

  // check if user exist
  const etiquetaExist = await Patrimony.findOne({etiqueta: etiqueta});

  if(etiquetaExist) {
    return res.status(400).json({error: "Patrimônio já cadastrado no sistema!"})
  }

  // verify user
  const token = req.header("auth-token");
  const userByToken = await getUserByToken(token);
  const userId = userByToken._id.toString();


  try {
    const user = await User.findOne({_id: userId});

    const patrimony = new Patrimony({
      tipoPatrimonio: tipoPatrimonio,
      etiqueta: etiqueta,
      nomePatrimonio: nomePatrimonio,
      marcaPatrimonio: marcaPatrimonio,
      fornecedor: fornecedor,
      enderecoFornecedor: enderecoFornecedor,
      filial: filial,
      local: local,
      centroCusto: centroCusto,
      status: status,
      aquisicao: aquisicao,
      garantia: garantia,
      depreciacao: depreciacao,
      observacao: observacao,
      userId: user._id.toString()
    })

    try {
      const newPatrimony = await patrimony.save();
      res.json({error: null, msg: "Cadastro realizado com sucesso!"})
    } catch(err) {
      return res.status(400).json({error})
    }

  } catch(err) {
    return res.status(400).json({error: "Acesso negado."})
  }


})

module.exports = router;