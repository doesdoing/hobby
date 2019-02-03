const express = require('express');
const MySql = require('../../component/component-mysql');
const info = require('../../mysql-info');
const sql_info = require('../../sql-cmd');
module.exports = function () {
    const server = express();
    server.post('/', function (req, res) {
        let SQL_CMD;let VALUE;
        if (req.session.user_id) {
            MySql.sql_con(info, 'db').then(function (data) {
                MySql.callback(data, sql_info.check_seesion_cookies, [req.session.user_id]).then(function (DATA) {
                    if (DATA[0].level == 'admin') {
                        if (req.query.sql == 'server_info' && req.query.SET_ID == '1') {
                            SQL_CMD = sql_info.ser_sql_set;
                            VALUE = [req.body.model, req.body.system_name, req.body.admin_name, req.body.password, req.body.OS, req.body.status, req.body.address, req.body.connect_link1, req.body.connect_link2, req.body.hosts_ip, req.body.system_software, req.body.port, req.body.ID];
                        } else if (req.query.sql == 'network_info' && req.query.SET_ID == '1') {
                            SQL_CMD = sql_info.net_sql_set;
                            VALUE = [req.body.model, req.body.hosts_ip, req.body.admin_name, req.body.password, req.body.status, req.body.address, req.body.ID];
                        } else if (req.query.sql == 'sql_info' && req.query.SET_ID == '1') {
                            SQL_CMD = sql_info.sql_sql_set;
                            VALUE = [req.body.model, req.body.instance, req.body.hosts_ip, req.body.admin_name, req.body.password, req.body.system_name, req.body.status, req.body.address, req.body.port, req.body.ID];
                        } else if (req.query.sql == 'server_info' && req.query.ADD_ID == '1') {
                            SQL_CMD = sql_info.ser_sql_add;
                            VALUE = [req.body.model, req.body.hosts_ip, req.body.system_name, req.body.admin_name, req.body.password, req.body.OS, req.body.address, req.body.status, req.body.connect_link1, req.body.connect_link2, req.body.system_software, req.body.port];
                        } else if (req.query.sql == 'network_info' && req.query.ADD_ID == '1') {
                            SQL_CMD = sql_info.net_sql_add;
                            VALUE = [req.body.model, req.body.hosts_ip, req.body.admin_name, req.body.password, req.body.status, req.body.address];
                        } else if (req.query.sql == 'sql_info' && req.query.ADD_ID == '1') {
                            SQL_CMD = sql_info.sql_sql_add;
                            VALUE = [req.body.model, req.body.instance, req.body.hosts_ip, req.body.admin_name, req.body.password, req.body.status, req.body.address, req.body.system_name, req.body.port];
                        } else if (req.query.sql == 'server_info' || req.query.sql == 'network_info' || req.query.sql == 'sql_info' && req.query.DEL_ID == '1') {
                            SQL_CMD = sql_info.normal_sql_del;
                            VALUE = [req.query.sql, req.body.ID];
                        }
                        MySql.callback(data, SQL_CMD, VALUE, 'T').then(function (D) {
                            if (req.query.sql == 'server_info') {
                                res.status(200).redirect('/servers-table-list');
                            } else if (req.query.sql == 'network_info') {
                                res.status(200).redirect('/network-table-list');
                            } else if (req.query.sql == 'sql_info') {
                                res.status(200).redirect('/sql-table-list');
                            }
                        });
                    }
                });
            });
        }
    });
    return server;
};