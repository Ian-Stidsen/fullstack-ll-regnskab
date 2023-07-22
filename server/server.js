const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());

app.get('/api', (req, res) => {
  // Read the JSON data from the file
  fs.readFile('serverData.json', 'utf8', (err, data) => {
    if (err) {
      // In case of an error, return an error response
      return res.status(500).json({ error: 'Error reading the data file' });
    }

    try {
      const jsonData = JSON.parse(data);
      // Send the entire JSON data as the response
      res.json(jsonData);
    } catch (parseError) {
      // In case of a parsing error, return an error response
      res.status(500).json({ error: 'Error parsing JSON data' });
    }
  });
});

app.post('/api/update', (req, res) => {
  const data = req.body;

  fs.writeFile('serverData.json', JSON.stringify(data), (err) => {
    if (err) {
      console.error('Error writing to the JSON file', err);
      res.status(500).send('Error writing to the JSON file');
    } else {
      console.log('JSON file successfully updated');
      res.send('JSON file successfully updated');
    }
  });
});

// Start the server
app.listen(4000, () => {
  console.log('Server is running on http://localhost:4000');
});