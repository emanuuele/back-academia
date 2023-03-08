const express = require("express");
const execSQLQuery = require("../dao");

const router = express.Router();

const pagamento = {
  valor: 1000,
  ultimoPagamento: new Date(),
  id_cliente: 3,
};

function addDays(date, days) {
  date.setDate(date.getDate() + days);
  return date;
}

router.get("/pagamentos", (req, res) => {
  execSQLQuery("SELECT * FROM Pagamentos", res);
});

router.post("/pagamentos", (req, res) => {
  let vencimento;
  let vencimentoString;
  
  vencimento = addDays(new Date(), pagamento.valor >= 1000 ? 365 : 30);
  vencimentoString = vencimento.toISOString().slice(0, 10);

  execSQLQuery(
    `INSERT INTO Pagamentos(valor, ultimoPagamento,id_client) VALUES (${
      pagamento.valor
    }, '${pagamento.ultimoPagamento.toISOString().slice(0, 10)}', ${
      pagamento.id_cliente
    });` +
      `UPDATE Clients SET vencimento = '${vencimentoString}' where id= ${pagamento.id_cliente};`,
    res
  );
});

router.put("/pagamentos/:id?", (req, res) => {
  const id = req.params.id;
  execSQLQuery(
    `UPDATE Pagamentos SET valor='${pagamento.valor}', ultimoPagamento = '${pagamento.ultimoPagamento}', id_cliente='${pagamento.id_cliente}' WHERE ID = ${id}`,
    res
  );
});
router.delete("/pagamentos/:id?", (req, res) => {
  const id = req.params.id;
  execSQLQuery(`DELETE FROM Pagamentos WHERE ID= ${id} `, res);
});

module.exports = router;
