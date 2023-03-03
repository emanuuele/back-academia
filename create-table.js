const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: "academia"
})
connection.connect((err)=>{
    if(err) return console.log(error)
    createTableClients(connection)
})
function createTableClients(conn) {
    const sql = "CREATE TABLE IF NOT EXISTS Clients(" +
        "id int NOT NULL AUTO_INCREMENT," +
        "nome varchar(150) NOT NULL," +
        "idade int NOT NULL," +
        "altura double NOT NULL, " +
        "peso double NOT NULL, " +
        "nascimento date NOT NULL, " +
        "ultimoPagamento date NOT NULL, " +
        "PRIMARY KEY (id));"
    conn.query(sql, (error, results, fiels) => {
        if (error) return console.log(error);
        console.log('aaa')
    })
}