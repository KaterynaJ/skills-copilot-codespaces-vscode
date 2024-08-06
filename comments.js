// Сreate web server and return comments in JSON format
var http = require('http');
var fs = require('fs');

// Create server
http.createServer(function (req, res) {
    // Read file with comments
    fs.readFile('comments.json', 'utf8', function (err, data) {
        if (err) {
            console.log('Error: ' + err);
            return;
        }
        // Send comments in JSON format
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(data);
    });
}).listen(8080);

console.log('Server running on port 8080.');