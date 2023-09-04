const express = require("express");
const execSQLQuery = require("../dao");

const router = express.Router();

function addDays(date, days) {
  date.setDate(date.getDate() + days);
  return date;
}

router.get("/pagamentos", (req, res) => {
  execSQLQuery(
    `select pagamentos.id, clients.nome, Concat('R$ ', Replace (Replace (Replace (Format(valor, 2), '.', '|'), ',', '.'), '|', ',')) as valor,` + 
    `DATE_FORMAT(STR_TO_DATE(clients.ultimoPagamento, '%Y-%m-%d'), '%d/%m/%Y') as ultimoPagamento, ` +
    `DATE_FORMAT(STR_TO_DATE(clients.vencimento, '%Y-%m-%d'), '%d/%m/%Y') as vencimento from clients, pagamentos where pagamentos.id_client = clients.id`,
    res
  );
});

router.post("/pagamentos", (req, res) => {
  const {
    pagamento: { valor, id_cliente },
  } = req.body;
  console.log('pagamento 1');
  let vencimento;
  let vencimentoString;

  vencimento = addDays(new Date(), valor >= 1000 ? 365 : 30);
  vencimentoString = vencimento.toISOString().slice(0, 10);

  execSQLQuery(
    `INSERT INTO Pagamentos(valor, id_client) VALUES (${valor}, ${id_cliente});` +
      `UPDATE Clients SET vencimento = '${vencimentoString}' where id= ${id_cliente};`,
    res
  );
});
/* router.post("/pagamentos", (req, res) => {
  const {
    pagamento: { valor, ultimoPagamento, id_cliente },
  } = req.body;
  console.log('pagamento 2');
  let vencimento;
  let vencimentoString;

  vencimento = addDays(new Date(), pagamento.valor >= 1000 ? 365 : 30);
  vencimentoString = vencimento.toISOString().slice(0, 10);

  execSQLQuery(
    `UPDATE Pagamentos valor=${valor}, ultimoPagamento='${ultimoPagamento
      .toISOString()
      .slice(0, 10)}' WHERE ID=${id_client}` +
      `UPDATE Clients SET vencimento = '${vencimentoString}', ultimoPagamento='${ultimoPagamento}' WHERE ID= ${id_cliente};`,
    res
  );
});
router.put("/pagamentos/:id?", (req, res) => {
  const id = req.params.id;
  execSQLQuery(
    `UPDATE Pagamentos SET valor='${pagamento.valor}', ultimoPagamento = '${pagamento.ultimoPagamento}', id_cliente='${pagamento.id_cliente}' WHERE ID = ${id}`,
    res
  );
}); */

module.exports = router;
