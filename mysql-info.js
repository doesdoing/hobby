const mysql = require('mysql');
let db = {
    host: 'localhost',
    user: 'root',
    password: xxx,//your mysql password
    database: 'mysqldb1',
    port: 3306,
    dateStrings: true
};
let poolCluster = mysql.createPoolCluster();
poolCluster.add('db', db);
module.exports = poolCluster;