var net = require('net');
module.exports = function (host, port) {
    return new Promise(function (resolve, reject) {
        var Socket = net.Socket;
        var socket = new Socket();
        socket.setTimeout(1500);
        socket.on('connect', function () {
            resolve('1');
            socket.end();
        });
        socket.on('timeout', function () {
            socket.destroy();
            reject('0');
        });
        socket.on('error', function (err) {
            reject('0');
        });
        socket.on('close', function (err) {});
        socket.connect(port, host);
    });
};