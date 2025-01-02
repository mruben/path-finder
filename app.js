const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { check_input } = require('./checkInput');
const { search_path } = require('./searchPath');

// Create an instance of Express
const app = express();
const port = 3000;

// Middleware to manage JSON and cross origin requests
app.use(express.json());
app.use(cors());

// Route to receive a JSON file with start parameters
app.post('/path_finder', (req, res) => {
    // Retrieve data sent by the client
    const inputJson = req.body;

    // Check the validity of the input file
    if (!check_input(inputJson)) {
        return res.status(400).json({ error: 'Invalid input file' });
    }

    // Retrieve the grid, the start and end point
    const { grid, start, end } = inputJson;

    // Find the path (if there is one)
    const found_path = search_path(grid, start, end);

    // Path to save the output file
    const outputFile = path.join(__dirname, 'output.json');
    console.log("Output file will be saved to:", outputFile);

    try {
        // Save the result in a 'output.json' file
        fs.writeFileSync(outputFile, JSON.stringify({ found_path }, null, 2));

        // Send the response to the client with the found path
        res.json({ found_path });
    } catch (err) {
        console.error("Error while writing the output file:", err);
        return res.status(500).json({ error: 'Error while saving the output file' });
    }
});

// Route to retrieve the content of the output.json file
app.get('/path_finder', (req, res) => {
    // Path of the output file
    const outputFile = path.join(__dirname, 'output.json');

    // Check if the file exists before reading it
    if (!fs.existsSync(outputFile)) {
        return res.status(404).json({ error: 'Output file does not exist' });
    }

    // Read the output file and send the content as a JSON response
    const output = fs.readFileSync(outputFile, 'utf8');
    res.json(JSON.parse(output));
});

// Start the server on the specified port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
