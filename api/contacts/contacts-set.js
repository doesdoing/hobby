const express = require('express');
const MySql = require('../../component/component-mysql');
const info = require('../../mysql-info');
const sql_info = require('../../sql-cmd');
module.exports = function () {
    const server = express();
    server.post('/', (req, res) => {
        let SQL_CMD;
        let VALUE;
        if (req.session.user_id) {
            MySql.sql_con(info, 'db').then(data => {
                MySql.callback(data, sql_info.check_seesion_cookies, [req.session.user_id]).then(DATA => {
                    if (DATA[0].level == 'admin' || DATA[0].level == 'user') {
                        if (req.query.DEL_ID == '1') {
                            SQL_CMD = sql_info.normal_sql_del;
                            VALUE = ['vandor', req.body.ID];
                        } else if (req.query.SET_ID == '1') {
                            SQL_CMD = sql_info.contacts_sql_set;
                            VALUE = [req.body.vandor, req.body.qq, req.body.phone, req.body.name, req.body.system, req.body.duty, req.body.ID];
                        } else if (req.query.ADD_ID == '1') {
                            SQL_CMD = sql_info.contacts_sql_add;
                            VALUE = [req.body.vandor, req.body.qq, req.body.phone, req.body.name, req.body.system, req.body.duty];
                        }
                        MySql.callback(data, SQL_CMD, VALUE, 'T').then(D => {
                            res.status(200).redirect('/contacts-list');
                        });
                    } else {
                        res.status(200).send('权限不足');
                    }
                });
            });
        }
    });
    return server;
};