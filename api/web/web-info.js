const express = require('express');
const MySql = require('../../component/component-mysql');
const info = require('../../mysql-info');
module.exports = function () {
    const server = express();
    server.get('/', function (req, res) {
        if (req.session.user_id) {
            MySql.sql_con(info, 'db').then(data => {
                MySql.callback(data, `SELECT * FROM users_info WHERE ID=?`, [req.session.user_id]).then(DATA => {
                    if (DATA) {
                        MySql.callback(data, req.query.word ? `SELECT * FROM ?? WHERE instr(system_name, ?) ORDER BY ID ASC` : `SELECT * FROM ??`, ['system_web', req.query.word ? req.query.word : null], 'T').then(D => {
                            res.status(200).jsonp(D);
                        });
                    }
                });
            });
        }
    });
    return server;
};