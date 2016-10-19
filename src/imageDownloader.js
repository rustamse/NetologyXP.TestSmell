import fs from 'fs'
import http from 'http'

var file = fs.createWriteStream("file.jpg");

export function download(uri, filename, callback) {
    var file = fs.createWriteStream(filename);
    var request = http.get(uri, function (response) {
        response.pipe(file);
        file.on('finish', function () {
            file.close(callback);
        });
    }).on('error', function (err) {
        fs.unlink(dest);
        if (callback) callback(err.message);
    });
};
