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

router.post("/pagamentos/", (req, res) => {
  const {
    pagamento: { valor, id_cliente },
  } = req.body;
  console.log('pagamento 1');
  let vencimento;
  let vencimentoString;

  vencimento = addDays(new Date(), valor >= 1000 ? 365 : 30);
  vencimentoString = vencimento.toISOString().slice(0, 10);

  execSQLQuery(
    `INSERT INTO pagamentos(valor, id_client) VALUES (${valor}, ${id_cliente});` +
      `UPDATE clients SET vencimento = '${vencimentoString}' where id= ${id_cliente};`,
    res
  );
});

module.exports = router;
