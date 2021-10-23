const express = require('express');
const microData = require('./Models/microData');
const app = express();

app.use(express.urlencoded( {extended: true} ));

const PORT = process.env.PORT || 9090

// Go to localhost:9090 in your browser while the program is running
app.get('/', (req, res) => {
  res.sendStatus(200);
});

app.post('/setData', (req, res) => {
  try{
    microData.setData(req.body.data);
  } catch {
    res.sendStatus(500);
  }
  res.sendStatus(200);
});

app.get('/getData', async (req, res) => {
  let data = await microData.getData();
  res.send(data);
});


// Starts an http server on the $PORT environment variable
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});