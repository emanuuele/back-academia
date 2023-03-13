const express = require("express");
const cors = require('cors');
const clientRouter = require("./routes/client.js");
const pagamentosRouter = require("./routes/pagamentos.js");
const veacosRouter = require("./routes/veacos.js");
const bodyParser = require('body-parser')
const server = express();
server.use(bodyParser.json({ limit: 819200 }));
server.use(bodyParser.urlencoded({ extended: true }));

server.use(express.json())

const corsOptions = {
	exposedHeaders: '*',
};

server.use(cors(corsOptions));

server.use(clientRouter);
server.use(pagamentosRouter);
server.use(veacosRouter)

server.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, server_id, version"
  );

  next()
});

const port = 3000; //porta padrão

server.listen(port, () => {
  console.log("eu estou executando");
});
