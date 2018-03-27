function solve(arr){
    let [n, m] = arr[0].split(" ").map(el => parseInt(el));
    let [startRow, startCol] = arr[1].split(" ").map(el => parseInt(el));
    let labyrinth = arr.slice(2);
    labyrinth = labyrinth.map(r => r.split(""));

    let matrix = [];
    for(let row = 0; row <= n; row++){
        matrix[row] = new Array(m);
        for(let col = 1; col <= m; col++){
            matrix[row][col - 1] = row * m + col;
        }
    }

    let isOut = false;
    let isLost = false;
    let sum = 0;
    let cells = 0;

    while(true){
        let nextMove = labyrinth[startRow][startCol];

        sum += matrix[startRow][startCol];
        cells++;

        labyrinth[startRow][startCol] = "0";
        if(nextMove === "l"){
            startCol--;
        }else if(nextMove === "r"){
            startCol++;
        }else if(nextMove === "u"){
            startRow--;
        }else if(nextMove === "d"){
            startRow++;
        }

        isOut = isOutside(startRow, startCol);
        if(isOut){
            break;
        }

        isLost = isLostHere(startRow, startCol);
        if(isLost){
            break;
        }
    }

    if(isOut){
        return `out ${sum}`;
    }

    if(isLost){
        return `lost ${cells}`;
    }

    function isOutside(row, col){
        if(col < 0 || col >= m || row < 0 || row >= n){
            return true;
        }
        return false;
    }

    function isLostHere(row, col){
        if(labyrinth[row][col] === "0"){
            return true;
        }
        return false;
    }
}

module.exports = {solve}