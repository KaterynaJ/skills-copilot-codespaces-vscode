// Сreate web server
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const comments = require('./comments');

const server = http.createServer((req, res) => {
  const urlParsed = url.parse(req.url, true);

  switch (urlParsed.pathname) {
    case '/':
      sendFile('index.html', res);
      break;

    case '/comments':
      comments.getComments((err, data) => {
        if (err) {
          res.statusCode = 500;
          res.end('Server error');
          return;
        }
        res.end(JSON.stringify(data));
      });
      break;

    case '/submit':
      let body = '';
      req
        .on('data', (chunk) => {
          body += chunk.toString();
        })
        .on('end', () => {
          const data = JSON.parse(body);
          comments.addComment(data, (err) => {
            if (err) {
              res.statusCode = 500;
              res.end('Server error');
              return;
            }
            res.end('Ok');
          });
        });
      break;

    default:
      res.statusCode = 404;
      res.end('Not found');
  }
});

server.listen(3000, () => {
  console.log('Server started');
});

function sendFile(fileName, res) {
  const fileStream = fs.createReadStream(path.join(__dirname, fileName));
  fileStream.pipe(res);

  fileStream.on('error', (err) => {
    res.statusCode = 500;
    res.end('Server error');
    console.error(err);
  });
}