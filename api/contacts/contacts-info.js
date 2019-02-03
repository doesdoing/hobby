const express = require('express');
const MySql = require('../../component/component-mysql');
const info = require('../../mysql-info');
module.exports = function () {
    const server = express();
    server.get('/', (req, res) => {
        let sql = req.query.word ? `SELECT * FROM vandor WHERE instr(concat(vandor,qq,phone,name,system,duty), ?) ORDER BY ID ASC` : `SELECT * FROM vandor`;
        if (req.session.user_id) {
            MySql.sql_con(info, 'db').then(data => {
                MySql.callback(data, `SELECT * FROM users_info WHERE ID=?`, [req.session.user_id]).then(DATA => {
                    if (DATA) {
                        MySql.callback(data, sql, [req.query.word ? req.query.word : null], 'T').then(D => {
                            res.status(200).send(D);
                        });
                    }
                });
            });
        }
    });
    return server;
};