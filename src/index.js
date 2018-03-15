module.exports = function solveSudoku(matrix) {
    let i, row, col, value, found;
    const zeroPositions = getZeroPositions(matrix);

    for (i = 0; i < zeroPositions.length;) {
        row = zeroPositions[i][0];
        col = zeroPositions[i][1];
        value = matrix[row][col] + 1;
        found = false;

        while (!found && value <= 9) {
            if (checkValue(matrix, col, row, value)) {
                found = true;
                matrix[row][col] = value;
                i++;
            }
            else {
                value++;
            }
        }
        if (!found) {
            matrix[row][col] = 0;
            i--;
        }
    }

    return matrix;
};

function checkRow(matrix, row, value) {
    for (let i = 0; i < 9; i++) {
        if (matrix[row][i] === value) {
            return false;
        }
    }
    return true;
}

function checkcol(matrix, col, value) {
    for (let i = 0; i < 9; i++) {
        if (matrix[i][col] === value) {
            return false;
        }
    }
    return true;
}

function checkBlock(matrix, col, row, value) {
    const blockRowStart = 3 * (Math.floor(row / 3));
    const blockCcolStart = 3 * (Math.floor(col / 3));

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (matrix[blockRowStart + i][blockCcolStart + j] === value) {
                return false;
            }
        }
    }
    return true;
}

function checkValue(matrix, col, row, value) {
    return checkRow(matrix, row, value) &&
        checkcol(matrix, col, value) &&
        checkBlock(matrix, col, row, value);
}

function getZeroPositions(matrix) {
    const res = [];

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (matrix[i][j] === 0) res.push([i, j]);
        }
    }
    return res;
}
