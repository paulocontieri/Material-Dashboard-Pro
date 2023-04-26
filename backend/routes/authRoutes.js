const router = require("express").Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const User = require("../models/user");

// register an user
router.post("/register", async (req, res) => {

  const name = req.body.name;
  const surname = req.body.surname;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  // check for required fields
  if(name == null || surname == null || email == null || password == null || confirmPassword == null) {
    return res.status(400).json({error: "Por favor, preencha todos os campos!"})
  }

  // check if user exist
  const emailExists = await User.findOne({email: email});

  // check if paswords match
  if(password != confirmPassword) {
    return res.status(400).json({error: "As senhas não conferem"})
  }

  if(emailExists) {
    return res.status(400).json({error: "O e-mail informado já está em uso!"})
  }

  // create password
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);
  console.log(passwordHash)

  const user = new User ({
    name: name,
    surname: surname,
    email: email,
    password: password
  });

  try {

    const newUser = await user.save();

    // create token
    const token = jwt.sign(
      //payload
      {
        name: newUser.name,
        id: newUser._id
      },
      "nossosecret"
    );

    //return token
    res.json({error: null, msg: "Você realizou o cadastro com sucesso", token: token, userId: newUser._id})

  } catch(error) {
    res.status(400).json({error})
  }

});

//login an user
router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // check if user exists
  const user = await User.findOne({email: email});

  if(!user) {
    return res.status(400).json({error: "Não há um usuário cadastrado com este e-mail!"})
  }

  // check if password match
  const checkPassword = await bcrypt.compare(password, user.password);
    
  if(password != user.password) {
    return res.status(400).json({error: "Senha inválida!"})  
  }

  // create token
  const token = jwt.sign(
    //payload
    {
      name: user.name,
      id: user._id
    },
    "nossosecret"
  );

  //return token
  res.json({error: null, msg: "Você está autenticado!", token: token, userId: user._id})
})

module.exports = router;
