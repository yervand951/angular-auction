var io = require('socket.io').listen(8080);



var db = require('./config/db.js');
db.query('SELECT * FROM auctions',function (err, rows, fields) {
    if(err) throw err;
    io.on('connection', function (socket) {

        socket.on('auctions', function (data) {
            socket.emit('message',{auctions:rows});
            console.log(data);
        });

        socket.on('connect', function (data) {
            socket.emit('message',{auctions:rows});
            console.log(data);
        });
    });
})