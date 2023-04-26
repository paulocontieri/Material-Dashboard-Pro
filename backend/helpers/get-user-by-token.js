const jwt = require("jsonwebtoken");
const User = require("../models/user");

// get user by jew token
const getUserbyToken = async (token) => {

  if(!token) {
    return res.status(401).json({ error: "Acesso negado!"});
  }

  // finder user
  const decoded = jwt.verify(token, "nossosecret");

  const userId = decoded.id;

  const user = await User.findOne({_id: userId})

  return user;

}

module.exports = getUserbyToken;