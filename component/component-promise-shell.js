const {
    exec
} = require('child_process');
module.exports = function (e) {
    return new Promise(function (resolve, reject) {
        exec(e, (error, stdout, stderr) => {
            if (error) {
                resolve('0');
            }
            if (stdout) {
                resolve('1');
            }
            if (stderr) {
                resolve('0');
            }
        });
    });
};