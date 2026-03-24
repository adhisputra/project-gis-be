const express = require('express');

const app = express();
const PORT = 3005;

app.get('/test', (req, res) => {
  res.json({ message: 'Basic test working' });
});

app.listen(PORT, () => {
  console.log(`Basic server running on port ${PORT}`);
});