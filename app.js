const express = require('express');
const functions = require('./function');
const app = express();

app.use(express.urlencoded( {extended: true} ));

const PORT = process.env.PORT || 9090

// Go to localhost:9090 in your browser while the program is running
app.get('/', (req, res) => {
    res.send("hello world")
    console.log(functions.func());
});

app.post('/getData', (req, res) => {
  console.log(req.body.data);
  res.sendStatus(200);
});

// Starts an http server on the $PORT environment variable
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});