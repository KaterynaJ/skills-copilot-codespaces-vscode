// Create web server
const express = require('express');
const app = express();

// Create a static web server
app.use(express.static('public'));

// Create a route
app.get('/comments', (req, res) => {
  res.send('This is a route for comments');
});

// Create a route for a specific comment
app.get('/comments/:id', (req, res) => {
  res.send(`This is a route for comment ${req.params.id}`);
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

// Run the server with node comments.js
// Access the server in the browser with http://localhost:3000

