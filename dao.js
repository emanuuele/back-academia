const mysql = require("mysql2");
const pool = mysql.createPool({
  host: "db4free.net",
  port: 3306,
  user: "demisroot",
  password: "javajava",
  database: "academiaestagiog",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true,
});

function execSQLQuery(sqlQry, res) {
  pool.query(sqlQry, (error, result, fields) => {
    if (error) {
      console.log({ euSouUmErro: error });
      res.json(error);
    } else {
      res?.json(result);
    }
    console.log("executou");
  });
}

module.exports = execSQLQuery;
