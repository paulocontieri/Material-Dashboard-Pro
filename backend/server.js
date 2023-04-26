// modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");


// routes
const authRouter = require("./routes/authRoutes.js")
const userRouter = require("./routes/userRoutes.js")
const workerRouter = require("./routes/workerRoutes.js")
const patrimonyRouter = require("./routes/patrimonyRoutes.js")


//middlewares

//config
const dbName = "patrimonio";
const port = 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

//atrelas as rotas no express
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/worker", workerRouter);
app.use("/api/patrimony", patrimonyRouter);


// conexao mongodb
mongoose.connect(
  `mongodb://localhost/${dbName}`
)

app.get("/", (req, res) => {
  res.json({ message: "Rota teste!"})
})

app.listen(port, () => {
  console.log(`O backend está rodando na porta ${port}`)
})