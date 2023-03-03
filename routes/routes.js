let express = require("express");
let router = express.Router();



function listarClientes() {
  router.get("/listarClientes", (req, res) => {
    execSQLQuery("SELECT * FROM clients", res);
  });
}
function cadastrar() {
  router.post("/listarClients", (req, res) => {

  });
}
function editarCliente() {
  router.put("/listarClientes/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const nome = req.body.name.substring(0, 150);
    const idade = parseInt(req.params.idade);
    const altura = parseFloat(req.params.altura);
    const peso = parseFloat(req.params.peso);
    const nascimento = req.body.name.substring(0, 7);
    const ultimoPagamento = req.body.name.substring(0, 7);
    execSQLQuery(
      `UPDATE Users SET name ="${nome}", idade="${idade}", altura="${altura}", peso="${peso}", nascimento="${nascimento}", ultimoPagamento="${ultimoPagamento}" WHERE ID = ${id}`,
      res
    );
  });
}
function excluirCliente() {
  router.delete("/listarClientes/:id", (req, res) => {});
}
