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
  origin: "https://front-academia.vercel.app", // Adicione a origem permitida
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Métodos permitidos
  allowedHeaders: ["Content-Type", "Authorization", "server_id", "version"], // Cabeçalhos permitidos
  exposedHeaders: ["server_id", "version"], // Cabeçalhos expostos, se necessário
  credentials: true, // Se necessário, para cookies/sessões
};

server.use(cors(corsOptions));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept, app_id, version');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Max-Age', 600);
    
    return res.status(200).end();
  }
  next();
});
server.use(clientRouter);
server.use(pagamentosRouter);
server.use(veacosRouter)

const port = process.env.PORT || 3000; //porta padrão

server.listen(port, () => {
  console.log("porta executada");
});
