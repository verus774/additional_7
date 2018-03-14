module.exports = function solveSudoku(matrix) {
    const values = mapPossibleValues(matrix);
    const matrixCopy = [...matrix];

    if (values) {
        for (let obj of values) {
            let {row, col, values} = obj;
            for (let v of values) {
                matrixCopy[row][col] = v;
                const result = solveSudoku(matrixCopy);
                if (result) {
                    return result;
                }
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

function mapPossibleValues(matrix) {
    const res = [];
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (matrix[i][j] !== 0) continue;

            const values = getPossibleValues(i, j, matrix);
            if (values.length === 0) return false;
            res.push({row: i, col: j, values});
        }
    }

    const VALUES_COMPARATOR = (left, right) => left.values.length - right.values.length;
    return res.sort(VALUES_COMPARATOR);
}
