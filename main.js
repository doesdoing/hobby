const express = require('express');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const GetDate = require('./component/component-date');
const fs = require("fs");
const compression = require('compression');
const server = express();
const MySql = require('./component/component-mysql');
const info = require('./mysql-info');
server.listen(80);
server.use(bodyParser.json({
    limit: '1mb'
}));
server.set('trust proxy', 1);
server.use(bodyParser.urlencoded({
    extended: false
}));
server.use(cookieParser());
server.use(compression());
(function () {
    var keys = [];
    MySql.sql_con(info, 'db').then(function (data) {
        MySql.callback(data, `select * from cookies`, [], 'T').then(function (D) {
            for (let i = 0; i < 100; i++) {
                keys[i] = D[i].val;
            }
        });
    });
    server.use(cookieSession({
        name: 'user_id',
        keys: keys,
        maxAge: 600 * 60 * 1000
    }));
})();

server.get('/admin', (req, res) => {
    if (!req.session.user_id && req.url != '/') {
        res.redirect('/');
    } else {
        res.sendFile(__dirname + '/www/index.html');
    }
});

server.get('/logout', (req, res) => {
    req.session = null;
    res.redirect('/');
});
server.post('/login', (req, res) => {
    var U = Buffer.from(req.body.name, 'base64');
    var P = Buffer.from(req.body.pass, 'base64');
    if (U != null && U != undefined && U != '' && P != null && P != undefined && P != '') {
        MySql.sql_con(info, 'db').then(function (DATA) {
            MySql.callback(DATA, `SELECT * FROM users_info WHERE username='${U}'`, [], 'T').then(function (data) {
                if (data.length != 0) {
                    if (data[0].password == P) {
                        req.session.user_id = data[0].ID;
                        res.status(200).send("ok").end();
                        let login_history = GetDate() + ' ' + req.connection.remoteAddress.replace(/[^\d.]/g, '') + ' ' + data[0].username + ' ' + "logined\n";
                        fs.appendFile('./login.log', login_history, function (err) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log(req.connection.remoteAddress.replace(/[^\d.]/g, '') + " success login");
                            }
                        });
                    } else {
                        res.redirect('/');
                    }
                } else {
                    res.redirect('/');
                }
            });
        });
    }
});

function check_session(req, res, p) {
    if (Number.isInteger(req.session.user_id)) {
        res.sendFile(__dirname + '/www/' + p + '.html');
    } else {
        res.redirect('/');
    }
}
server.get('/', (req, res) => {
    if (Number.isInteger(req.session.user_id)) {
        res.redirect('/admin');
    } else {
        res.sendFile(__dirname + '/www/login.html');
    }
});
server.get('/network-table-list', (req, res) => {
    check_session(req, res, 'network-table-list');
});
server.get('/servers-table-list', (req, res) => {
    check_session(req, res, 'servers-table-list');
});
server.get('/sql-table-list', (req, res) => {
    check_session(req, res, 'sql-table-list');
});
server.get('/contacts-list', (req, res) => {
    check_session(req, res, 'contacts-list');
});
server.get('/system-web-list', (req, res) => {
    check_session(req, res, 'system-web-list');
});

server.use('/login/bg/mp4', require('./api/bgmp4/mp4')());
server.use('/contacts/set', require('./api/contacts/contacts-set')());
server.use('/contacts/info', require('./api/contacts/contacts-info')());
server.use('/web/info', require('./api/web/web-info')());
server.use('/web/set', require('./api/web/web-set')());
server.use('/server/del/edu', require('./api/edu/edu.del')());
server.use('/sql/info', require('./api/server/sql-info.js')());
server.use('/sql/set', require('./api/server/sql-set.js')());
server.get('/*.html', (req, res) => {
    res.redirect('/');
});
server.use(express.static(__dirname + '/www'));
server.use(express.static(__dirname + '/download'));