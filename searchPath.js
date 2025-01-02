
/**
 * This function finds a path between 2 points in a grid by using a BFS algorithm
 * 
 * @param {number[][]} grid : Grid filled with 0 (open cell) and 1 (close cell) values
 * @param {number[]} start : Coordinates of the start point
 * @param {number[]} end : Coordinates of the end point
 * @returns {number[][] | null} : An array filled with the coordinates of the found path or null if not
 */
function search_path(grid, start, end) {
    // Grid size
    const [rows, cols] = [grid.length, grid[0].length];
    // Queue initialization as empty
    const queue = [];
    // A Set object to follow the visited cells
    const visited = new Set();

    // Add the initial path containing only the starting cell
    queue.push([start]);
    // Add the starting cell as visited
    visited.add(start.toString());

    // Browse all the paths until queue is empty
    while (queue.length > 0) {
        // Retrieve and remove the first path in the queue
        const path = queue.shift();
        // Retrieve the last cell of the current path
        const [x, y] = path[path.length - 1];

        // Check if the current cell is the end point
        if (x === end[0] && y === end[1]) {
            return path;
        }

        // Possible moves in the grid (in order: left, right, up, down)
        const directions = [
            [x - 1, y],
            [x + 1, y],
            [x, y - 1],
            [x, y + 1],
        ];

        // Explore neighboring cells
        for (const [newX, newY] of directions) {
            // Check the limits of the grid and if the cell is empty and unvisited
            if (
                newX >= 0 && newX < rows &&
                newY >= 0 && newY < cols &&
                grid[newX][newY] === 0 &&
                !visited.has([newX, newY].toString())
            ) {
                // Mark as visited
                visited.add([newX, newY].toString());
                // Add the new path to the queue
                queue.push([...path, [newX, newY]]);
            }
        }
    }

    // If no path is found
    return null;
}

module.exports = { search_path };