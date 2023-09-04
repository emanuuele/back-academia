function createTableClients(conn) {
  const sql =
    "CREATE TABLE IF NOT EXISTS Clients(" +
    "id int NOT NULL AUTO_INCREMENT," +
    "nome varchar(150) NOT NULL," +
    "idade int NOT NULL," +
    "altura double NOT NULL, " +
    "peso double NOT NULL, " +
    "nascimento varchar(10) NOT NULL, " +
    "ativo varchar(1), "+
    "PRIMARY KEY (id));";
  conn.query(sql, (error, results, fiels) => {
    if (error) return console.log(error);
  });
}
function createTablePagamentos(conn) {
  const sql =
    "CREATE TABLE IF NOT EXISTS pagamentos (" +
    "`id` INT NOT NULL AUTO_INCREMENT," +
    "`valor` DOUBLE NOT NULL," +
    "`ultimoPagamento` varchar(10) NOT NULL," +
    "`id_client` INT NOT NULL," +
    "PRIMARY KEY (`id`)," +
    "INDEX `id_cliente_idx` (`id_client` ASC) VISIBLE," +
    "CONSTRAINT `id_cliente`" +
    "FOREIGN KEY (`id_client`)" +
    "REFERENCES `clients` (`id`)" +
    "ON DELETE NO ACTION " +
    "ON UPDATE NO ACTION);";
  conn.query(sql, (error, results, fiels) => {
    if (error) return console.log(error);
    console.log("tabela pagamentos criada");
  });
}

module.exports = { createTableClients, createTablePagamentos };
