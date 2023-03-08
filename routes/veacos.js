const execSQLQuery = require("../dao");

const express = require("express");

const router = express.Router();



router.get("/veacos", (req, res) => {
  execSQLQuery(
    `SELECT * FROM Clients where CURDATE() > vencimento`,
    res
  );
});
