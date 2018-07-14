"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
     * @param a first string for comparison
     * @param b second string for comparison
     * @param caseSensitive whether or not to use case sensitive matching
     * @return a levenshtein string distance
     */
function getLevenshteinDistance(a, b, caseSensitive) {
    if (!caseSensitive) {
        a = a.toUpperCase();
        b = b.toUpperCase();
    }
    let matrix = generateLevenshteinMatrix(a, b);
    return matrix[a.length][b.length];
}
exports.getLevenshteinDistance = getLevenshteinDistance;
/**
 * @param a first string for comparison
 * @param b second string for comparison
 * @return a  case sensitive string representation of the search matrix
 */
function getLevenshteinMatrix(a, b) {
    let matrix = generateLevenshteinMatrix(a, b);
    let result = [];
    const ROWS = a.length + 1;
    const COLS = b.length + 1;
    result.push(rowSeperator(COLS - 1, false));
    result.push(("|    " + b + " |\n"));
    result.push(rowSeperator(COLS - 1, true));
    for (let r = 0; r < ROWS; r++) {
        result.push('|');
        if (r > 0) {
            result.push(a.charAt(r - 1));
        }
        else {
            result.push(' ');
        }
        result.push(" |");
        for (let c = 0; c < COLS; c++) {
            result.push(matrix[r][c] + "");
        }
        result.push(" |\n");
    }
    result.push(rowSeperator(COLS - 1, false));
    return result.join("");
}
exports.getLevenshteinMatrix = getLevenshteinMatrix;
function rowSeperator(LEN, hasGap) {
    let result = [];
    if (hasGap) {
        result.push("+  +-");
    }
    else {
        result.push("+----");
    }
    for (let i = 0; i < LEN; i++)
        result.push('-');
    result.push("-+\n");
    return result.join("");
}
exports.rowSeperator = rowSeperator;
function generateLevenshteinMatrix(a, b) {
    const ROWS = a.length + 1;
    const COLS = b.length + 1;
    let matrix = [];
    for (let i = 0; i < ROWS; i++)
        matrix.push(new Array(COLS));
    for (let r = 0; r < ROWS; r++) {
        matrix[r][0] = r;
    }
    for (let c = 0; c < COLS; c++) {
        matrix[0][c] = c;
    }
    for (let r = 1; r < ROWS; r++) {
        let cA = a.charAt(r - 1);
        for (let c = 1; c < COLS; c++) {
            let cB = b.charAt(c - 1);
            let cost = (cA == cB) ? 0 : 1;
            let deletion = matrix[r - 1][c] + 1;
            let insertion = matrix[r][c - 1] + 1;
            let substitution = matrix[r - 1][c - 1] + cost;
            let minimum = Math.min(Math.min(deletion, insertion), substitution);
            if ((r > 1 && c > 1) && a.charAt(r - 2) == cB && cA == b.charAt(c - 2)) {
                let transposition = matrix[r - 2][c - 2] + cost;
                minimum = Math.min(minimum, transposition);
            }
            matrix[r][c] = minimum;
        }
    }
    return matrix;
}
exports.generateLevenshteinMatrix = generateLevenshteinMatrix;
