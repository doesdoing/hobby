function sql_con(POOL, DB) {
    var promise = new Promise(function (resolve, reject) {
        POOL.getConnection(DB, function (err, connection) {
            if (err) {
                console.log(err);
            } else {
                resolve(connection);
            }
        });
    });
    return promise;
}

function callback(connection, SQL, DATA, EXIT) {
    var promise = new Promise(function (resolve, reject) {
        connection.query(SQL, DATA, (error, data) => {
            if (error) throw error;
            resolve(data);
            if (EXIT) {
                connection.release();
            }
        });
    });
    return promise;
}
module.exports = {
    'sql_con': sql_con,
    'callback': callback
};