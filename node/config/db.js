(function () {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password:'',
        database:'auction'
    });
    connection.connect();
     module.exports = connection;
})();

