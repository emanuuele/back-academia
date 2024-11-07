const execSQLQuery = require("../dao");

const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  execSQLQuery(`SELECT id, nome, altura, peso, idade, DATE_FORMAT(STR_TO_DATE(nascimento, '%d/%m/%Y'), '%d-%m-%Y') as nascimento, DATE_FORMAT(STR_TO_DATE(ultimoPagamento, '%Y-%m-%d'), '%d-%m-%Y') as ultimoPagamento FROM Clients where ativo is null or ativo = 'S'`, res);
});

router.post("/clients", (req, res) => {
  const {
    clientData: { nome, idade, peso, altura, nascimento, ultimoPagamento },
  } = req.body;
  execSQLQuery(
    `INSERT INTO Clients(nome, idade, altura, peso, nascimento, ultimoPagamento, ativo) VALUES ('${nome}', ${idade}, ${altura}, ${peso}, '${nascimento}', '${ultimoPagamento}', 'S');`,
    res
  );
});
router.get('/clients/:param?', (req,res)=>{
  let param = req.params.param
  execSQLQuery(`SELECT * FROM Clients where nome like '%${param}%' and ativo = 'S' or id like '%${param}%' and ativo = 'S'`, res)
})

router.put("/clients/:id?", (req, res) => {
  const id = parseInt(req.params.id);
  const {
    clientData: { nome, idade, peso, altura, nascimento },
  } = req.body;

  console.log( `UPDATE Clients SET nome ="${nome}", idade=${idade}, altura=${altura}, peso=${peso}, nascimento="${nascimento}" WHERE id = ${id}`)

  execSQLQuery(
    `UPDATE Clients SET nome ="${nome}", idade=${idade}, altura=${altura}, peso=${peso}, nascimento="${nascimento}" WHERE id = ${id}`,
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
