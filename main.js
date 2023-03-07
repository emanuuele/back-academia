const express = require('express')
const server = express()
const router = require('./routes/client.js')
server.use(router)


const port = 3000; //porta padrão
server.listen(port, () => { console.log('eu estou executando')})