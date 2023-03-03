const express = require('express')
const server = express()
server.listen(3001)
let userRoute = require('userRoute')

server.get('/', ()=>{
    console.log('aaa')
})