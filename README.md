# PATH FINDER APP
==============================

## Overview
------------

From a JSON file, this path finder app reads a grid of cells (which can be open or closed)
and finds the path from the start to the end position if it exists (also given in the JSON file).
The app finally saves the result in a JSON output file `output.json` in the app's root directory.
This app uses a REST API architecture to interact with the different functions.


## Structure of the app
------------

### checkInput.js

In this file, the `check_input` function checks the validity of the input JSON file:
- if the required keys are present (grid, start, end)
- if the grid is a non empty 2 dimensions array
- if the grid only contains 0 and 1 values
- if the start and end coordinates are valid (within the grid limits and on open cells)


### searchPath.js

In this file, the `search_path` function finds a path between 2 points in a grid by using a BFS algorithm.
The principle of a BFS algorithm is that it explores all possible paths from the starting point in
ascending order of length, guaranteeing that the first path found will be the shortest.
The path finder algorithm does the following tasks:
- it initializes a waiting queue to explore each cell
- it marks the visited cells to avoid loops
- it checks at each step if the current cell is the ending point
- if no path is found, it returns null


### app.js

This file is the main entry point of the application. It defines the REST API endpoints (using Express.js).
It uses middlewares such as:
- express.json() to parse JSON request bodies
- cors() to allow cross-origin requests

Here are the definitions of each endpoint:
- POST /path_finder
- - Accepts a JSON object as input containing the grid, start and end positions
- - Validates the input using the `check_input` function
- - Calculates the path (if it exists) using the `search_path` function
- - Saves the result to an `output.json` file and returns the path in the response

- GET /path_finder
- - Reads and returns the content of the `output.json` file (checks if it exists first)
- - If there is no result, it returns an error message


### samples folder

This folder contains JSON files for testing the app with different scenarios.
Here an example of the JSON input file structure:
```json
{
  "grid": [[0, 1, 0], [0, 0, 1], [1, 0, 0]],
  "start": [0, 0],
  "end": [2, 2]
}
```


## How to run the app
------------

### Retrieve from Docker Hub

You need first to pull the image:
```bash
docker pull mrubennd/path-finder-app:latest
```

Then you have to run the Docker container:
```bash
docker run -p 3000:3000 path-finder-app
```

### Run locally

You can also run the app locally. You need first to install the dependencies then to launch the app:
```bash
npm install
node app.js
```

### Interact with the REST API

Send a JSON file to find the path:
```bash
curl -X POST http://localhost:3000/path_finder \
     -H "Content-Type: application/json" \
     -d @samples/easy.json
```

Retrieve the result from the output file:
```bash
curl -X GET http://localhost:3000/path_finder
```