const execSQLQuery = require("../dao");

const express = require("express");

const router = express.Router();



router.get("/veacos", (req, res) => {
  execSQLQuery(
    `SELECT id, nome, altura, peso, idade, nascimento, DATE_FORMAT(STR_TO_DATE(ultimoPagamento, '%Y-%m-%d'), '%d/%m/%Y') as ultimoPagamento FROM Clients where CURDATE() > vencimento`,
    res
  );
});
module.exports = router;