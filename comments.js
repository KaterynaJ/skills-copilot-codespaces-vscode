//Сreate web server
var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
    console.log('request ', req.url);

    var file = req.url == '/' ? '/index.html' : req.url;
    fs.readFile(__dirname + file, function (err, data) {
        if (err) {
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
        }
        res.writeHead(200);
        res.end(data);
    });
}).listen(3000, function () {
    console.log('server is running on http://localhost:3000/');
});