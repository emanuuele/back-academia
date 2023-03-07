const execSQLQuery = require('../dao')

const express = require("express");

const router = express.Router();

//https://www.vivaolinux.com.br/dica/Convertendo-varchar-em-date-no-MySQL
const client = {
  nome: "aaaaaaaaaaa",
  idade: 11,
  altura: 11,
  peso: 1111,
  nascimento: '12-12-1212',
  ultimoPagamento: '12-12-1212',
};


  router.get("/clients", (req, res) => {
    execSQLQuery("SELECT * FROM Clients", res);
  });


  router.post("/clients", (req, res) => {
    execSQLQuery(
      `INSERT INTO Clients(nome, idade, altura, peso, nascimento, ultimoPagamento) VALUES ('${client.nome}', '${client.idade}', '${client.altura}', '${client.peso}', '${client.nascimento}', '${client.ultimoPagamento}')`,
      res
    );
  });

  router.put("/clients/:id?", (req, res) => {
    const id = parseInt(req.params.id);
    execSQLQuery(
      `UPDATE Clients SET nome ="${client.nome}", idade="${client.idade}", altura="${client.altura}", peso="${client.peso}", nascimento="${client.nascimento}", ultimoPagamento="${client.ultimoPagamento}" WHERE ID = ${id}`,
      res
    );
  });

  router.delete("/clients/:id?", (req, res) => {
    const id = parseInt(req.params.id);
    execSQLQuery(`DELETE FROM Clients WHERE ID= ${id}`, res)
  });


  router.get('/clients/:id?', (req, res, next) => {
    let filter = ''
    if (req.params.id) filter = ' WHERE ID= ' + parseInt(req.params.id)
    execSQLQuery('SELECT * FROM Clients' + filter, res);
})


module.exports = router