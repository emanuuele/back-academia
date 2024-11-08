const {
  createTableClients,
  createTablePagamentos,
} = require("./create-table.js");
const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "db4free.net",
  port: 3306,
  user: "demisroot",
  password: "javajava",
  database: "academiaestagiog",
  multipleStatements: true,
});
connection.connect((err) => {
  if (err) return console.log(err);
  createTableClients(connection);
  createTablePagamentos(connection);
});

function execSQLQuery(sqlQry, res) {
  connection.query(sqlQry, (error, result, fields) => {
    if (error) {
      console.log({ euSouUmErro: error });
      res.json(error);
    } else {
      res?.json(result);
    }

    //connection.end();
    console.log("executou");
  });
}

module.exports = execSQLQuery
