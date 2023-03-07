const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "academia",
});
connection.connect((err) => {
  if (err) return console.log(err)
  createTableClients(connection)
  //passa connection (o objeto) como parametro na função createTable
})
function createTableClients(conn) {
  const sql =
    "CREATE TABLE IF NOT EXISTS Clients(" +
    "id int NOT NULL AUTO_INCREMENT," +
    "nome varchar(150) NOT NULL," +
    "idade int NOT NULL," +
    "altura double NOT NULL, " +
    "peso double NOT NULL, " +
    "nascimento varchar(10) NOT NULL, " +
    "ultimoPagamento varchar(10) NOT NULL, " +
    "PRIMARY KEY (id));";
  conn.query(sql, (error, results, fiels) => {
    if (error) return console.log(error);
    console.log("aaa");
  });

  /* function createTablePagamentos(conn) {
        const sql =
          "CREATE TABLE IF NOT EXISTS `academia`.`pagamentos` (" +
          "`idpagamentos` INT NOT NULL," +
          "`valor` DOUBLE NOT NULL," +
          "`ultimoPagamento` DATE NOT NULL," +
          "`id_client` INT NOT NULL," +
          "PRIMARY KEY (`idpagamentos`)," +
          "INDEX `id_cliente_idx` (`id_client` ASC) VISIBLE," +
          "CONSTRAINT `id_cliente`" +
          "FOREIGN KEY (`id_client`)" +
          "REFERENCES `academia`.`clients` (`id`)" +
          "ON DELETE NO ACTION" +
          "ON UPDATE NO ACTION);";
          conn.query(sql, (error, results, fiels) => {
              if (error) return console.log(error);
              console.log("bbb");
            });
      } */
}
module.exports = createTableClients