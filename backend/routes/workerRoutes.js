const router = require("express").Router();
const jwt = require("jsonwebtoken");

const Worker = require("../models/worker")
const User = require("../models/user")

// middlewares
const verifyToken = require("../helpers/check-token");

// helpers
const getUserByToken = require("../helpers/get-user-by-token");
const { Router } = require("express");

// create new worker
router.post("/", verifyToken, async (req, res) => {
  // req data
  const filial = req.body.filial;
  const departamento = req.body.departamento;
  const cargo = req.body.cargo;
  const lider = req.body.lider;
  const nome = req.body.nome;
  const email = req.body.email;
  const adress = req.body.adress;

  // validations
  if(filial == null || departamento == null || cargo == null || lider == null || nome == null || email == null) {
    return res.status(400).json({error: "Por favor, preencha todos os campos!"})
  }

  // check if user exist
  const emailExists = await Worker.findOne({email: email});

  if(emailExists) {
    return res.status(400).json({error: "Usuário já cadastrado no sistema!"})
  }

  // verify user
  const token = req.header("auth-token");
  const userByToken = await getUserByToken(token);
  const userId = userByToken._id.toString();


  try {
    const user = await User.findOne({_id: userId});

    const worker = new Worker({
      filial: filial,
      departamento: departamento,
      cargo: cargo,
      lider: lider,
      nome: nome,
      email: email,
      adress: adress,
      userId: user._id.toString()
    })

    try {
      const newWorker = await worker.save();
      res.json({error: null, msg: "Cadastro realizado com sucesso!"})
    } catch(err) {
      return res.status(400).json({error})
    }

  } catch(err) {
    return res.status(400).json({error: "Acesso negado."})
  }

})

module.exports = router;

