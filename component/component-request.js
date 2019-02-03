const request = require('request');
module.exports = function (url) {
    return new Promise(function (resolve, reject) {
        request({
            uri: url,
            method: 'GET',
            time: true
        }, (err, res) => {
            if (!err) {
                if (res.statusCode == 200) {
                    resolve(res);
                }
            }
        });
    });
};