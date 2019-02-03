const express = require('express');
const MySql = require('../../component/component-mysql');
const info = require('../../mysql-info');
module.exports = function () {
    const server = express();
    server.get('/', function (req, res) {
        let sql_info_for_admin = req.query.word ? `SELECT * from ?? where instr(??, ?) ORDER BY ID ASC` : `SELECT * from ?? ORDER BY ID ASC`;
        let sql_info_for_guest;
        if (req.query.sql == 'server_info') {
            sql_info_for_guest = req.query.word ? `SELECT ID,model,hosts_ip,system_name,OS,address,status,connect_link1,connect_link2,system_software,portFROM ?? where instr(??, ?) ORDER BY ID ASC` : `SELECT ID,model,hosts_ip,system_name,OS,address,status,connect_link1,connect_link2,system_software,port FROM ??`;
        } else if (req.query.sql == 'network_info') {
            sql_info_for_guest = req.query.word ? `SELECT ID,model,hosts_ip,status,address FROM ??  WHERE instr(??, ?) ORDER BY ID ASC` : `SELECT ID,model,hosts_ip,status,address FROM ??`;
        } else if (req.query.sql == 'sql_info') {
            sql_info_for_guest = req.query.word ? `SELECT ID,model,hosts_ip,state,address,system_name FROM ?? WHERE instr(??, ?) ORDER BY ID ASC` : `SELECT ID,model,hosts_ip,state,address,system_name FROM ??`;
        }
        if (req.session.user_id) {
            MySql.sql_con(info, 'db').then(function (data) {
                MySql.callback(data, `SELECT * FROM users_info WHERE ID=? `, [req.session.user_id]).then(function (DATA) {
                    if (DATA[0].level == 'admin' || DATA[0].level == 'user') {
                        MySql.callback(data, sql_info_for_admin, [req.query.sql, req.query.which ? req.query.which : null, req.query.word ? req.query.word : null], 'T').then(function (D) {
                            res.status(200).send(D);
                        });
                    } else if (DATA[0].level == 'guest') {
                        MySql.callback(data, sql_info_for_guest, [req.query.sql, req.query.which ? req.query.which : null, req.query.word ? req.query.word : null], 'T').then(function (D) {
                            res.status(200).send(D);
                        });
                    }
                });
            });
        }
    });
    return server;
};