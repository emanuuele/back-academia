const execSQLQuery = require("../dao");

const express = require("express");

const router = express.Router();

router.get("/clients", (req, res) => {
  execSQLQuery(`SELECT * FROM Clients where ativo is null or ativo = 'S'`, res);
});

router.post("/clients", (req, res) => {
  const {
    clientData: { nome, idade, peso, altura, nascimento },
  } = req.body;
  execSQLQuery(
    `INSERT INTO Clients(nome, idade, altura, peso, nascimento) VALUES ('${nome}', '${idade}', '${altura}', '${peso}', '${nascimento}')`,
    res
  );
});

router.put("/clients/:id?", (req, res) => {
  const id = parseInt(req.params.id);
  const {
    clientData: { nome, idade, peso, altura, nascimento },
  } = req.body;

  console.log( `UPDATE Clients SET nome ="${nome}", idade=${idade}, altura=${altura}, peso=${peso}, nascimento="${nascimento}" WHERE id = ${id}`)

  execSQLQuery(
    `UPDATE Clients SET nome ="${nome}", idade="${idade}", altura="${altura}", peso="${peso}", nascimento="${nascimento}" WHERE id = ${id}`,
    res
  );
});

router.delete("/clients/:id?", (req, res) => {
  const id = parseInt(req.params.id);
  const flag = "N";
  execSQLQuery(`UPDATE Clients SET ativo="${flag}" WHERE ID = ${id}`, res);
});

router.get("/clients/:id?", (req, res, next) => {
  let filter = "";
  if (req.params.id) filter = " WHERE ID= " + parseInt(req.params.id);
  execSQLQuery("SELECT * FROM Clients" + filter, res);
});

module.exports = router;
