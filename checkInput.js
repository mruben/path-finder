/**
 * This function checks the validity of the input data for a path finder algorithm
 * 
 * @param {Object} json_file : JSON object containing the input data
 * @returns {boolean} : True if the data are valid if not false
 */
function check_input(json_file) {
    const { grid, start, end } = json_file;

    // Check that the required keys are present
    if (!grid || !start || !end) {
        console.error("Input file is missing 'grid', 'start', or 'end' key.");
        return false;
    }

    // Check if the grid (and each row) is a non empty 2 dimensions array
    if (!Array.isArray(grid) ||
        grid.length === 0 ||
        !grid.every(row => Array.isArray(row))
    ) {
        console.error("The grid must be a non empty 2 dimensions array.");
        return false;
    }
    // Check if the grid only contains 0 and 1 values
    if (!grid.flat().every(cell => cell === 0 || cell === 1)) {
        console.error("The grid must contain only 0 and 1.");
        return false;
    }

    // Check if the start and end coordinates are valid (within the grid limits and on open cells)
    const isValidCoord = coord =>
        Array.isArray(coord) && // Check if it's an array
        coord.length === 2 && // Check if the array as 2 elements
        coord.every(Number.isInteger) && // Check if the 2 elements are integers
        coord[0] >= 0 && coord[0] < grid.length && // Check that the x coordinate is within the grid limits
        coord[1] >= 0 && coord[1] < grid[0].length && // Check that the y coordinate is within the grid limits
        grid[coord[0]][coord[1]] === 0; // Check that the corresponding cell is open
        

    if (!isValidCoord(start) || !isValidCoord(end)) {
        console.error("The 'start' and 'end' coordinates must be within the grid limits and on open cells.");
        return false;
    }

    // If everything is valid
    return true;
}

module.exports = { check_input };