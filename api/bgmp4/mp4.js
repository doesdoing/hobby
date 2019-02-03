const express = require('express');
const fs = require("fs");
module.exports = function () {
    const server = express();
    server.get('/', (req, res) => {
        let path = '/opt/node/www/assets/video/123.mp4';
        let stat = fs.statSync(path);
        let fileSize = stat.size;
        let range = req.headers.range;
        if (range) {
            let parts = range.replace(/bytes=/, "").split("-");
            let start = parseInt(parts[0], 10);
            let end = parts[1] ? parseInt(parts[1], 10) : start + 999999;
            end = end > fileSize - 1 ? fileSize - 1 : end;
            let chunksize = (end - start) + 1;
            let file = fs.createReadStream(path, {
                start,
                end
            });
            let head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mp4',
            };
            res.writeHead(206, head);
            file.pipe(res);
        } else {
            let head = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
            };
            res.writeHead(200, head);
            fs.createReadStream(path).pipe(res);
        }
    });
    return server;
};