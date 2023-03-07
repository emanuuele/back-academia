const express = require('express')
const server = express()
const clientRouter = require('./routes/client.js')
server.use(clientRouter)
const pagamentosRouter = require('./routes/pagamentos.js')
server.use(pagamentosRouter)


const port = 3000; //porta padrão
server.listen(port, () => { console.log('eu estou executando')})