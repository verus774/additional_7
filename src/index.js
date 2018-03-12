module.exports = function solveSudoku(matrix) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (matrix[i][j] !== 0) continue;
            const possibleValues = getPossibleValues(i, j, matrix);
            const possibleValueCount = possibleValues.length;

            if (possibleValueCount === 0) return false;
            if (possibleValueCount === 1) {
                matrix[i][j] = possibleValues[0];
            }
        }
    }
    return matrix;
};

function diff(a, b) {
    return a.filter(x => b.indexOf(x) < 0);
}

function getColumnValues(columnIndex, matrix) {
    const res = [];
    for (let i = 0; i < 9; i++) {
        res.push(matrix[i][columnIndex]);
    }
    return res;
}

function getRowValues(rowIndex, matrix) {
    return matrix[rowIndex];
}

function getBlockValues(rowIndex, columnIndex, matrix) {
    const res = [];

    const blockRowStart = 3 * (Math.floor(rowIndex / 3));
    const blockColumnStart = 3 * (Math.floor(columnIndex / 3));

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            res.push(matrix[blockRowStart + i][blockColumnStart + j]);
        }
    }
    return res;
}

function getPossibleValues(rowIndex, columnIndex, matrix) {
    let values = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    values = diff(values, getRowValues(rowIndex, matrix));
    values = diff(values, getColumnValues(columnIndex, matrix));
    values = diff(values, getBlockValues(rowIndex, columnIndex, matrix));

    return values;
}
