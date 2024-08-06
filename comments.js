//create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/comments', (req, res) => {
    res.sendFile(__dirname + '/comments.html');
});

app.post('/comments', (req, res) => {
    let comment = req.body.comment;
    let name = req.body.name;
    let email = req.body.email;
    let data = fs.readFileSync('comments.json');
    let json = JSON.parse(data);
    json.push({ name: name, email: email, comment: comment });
    fs.writeFileSync('comments.json', JSON.stringify(json));
    res.send('Your comment has been submitted!');
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});