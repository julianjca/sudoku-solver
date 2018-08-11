"use strict";

class Sudoku {
  constructor(board_string) {
    this.papan = this.createInitialBoard(board_string);
    this.initialBoard = this.createInitialBoard(board_string);
    this.solution = this.solve(this.papan);
  }

  //*Solving Sudoku
  solve(papan) {
    console.log("======================");
    console.log("INITIAL BOARD");
    console.log("======================");
    console.log(papan);
    console.log("");

    let x;
    let y;
    let checkColCon = false;
    let checkRowCon= false;
    let checkBoxwCon = false;
    let coordinate = this.findEmpty();
    let counterCoor = 0;
    let counterEmpty = 0;
    //console.log("Empty Coordinate");
    //console.log(coordinate);
    let number = 1;


    while(counterEmpty < coordinate.length){
        x = coordinate[counterCoor][0];
        y = coordinate[counterCoor][1];

        let condition = false;

        while(condition===false){
          checkColCon = false;
          checkRowCon= false;
          checkBoxwCon = false;

          checkColCon = this.checkCol(number, y, this.papan);
          checkRowCon = this.checkRow(number, x, this.papan);
          checkBoxwCon = this.checkBox(number, x, y);

          if(checkRowCon&&checkColCon&&checkBoxwCon === true){
            this.papan[x][y] = number;
            condition = true;
            counterCoor++;
            number = 1;
            this.printBoard(papan);
            //console.log(papan);
            this.sleep();
            this.clearScreen();

            counterEmpty++;
            break;
          }

          else if((number === 9 && condition===false) || (number===9 && (checkRowCon && checkColCon && checkBoxwCon === false))){
            this.papan[x][y] = 0;
            counterCoor--;
            counterEmpty--;
            x = coordinate[counterCoor][0];
            y = coordinate[counterCoor][1];
            number = this.papan[x][y];
            condition = false;
            break;
          }

          else{
            number++;
          }
        }
      }

      console.log("");
      console.log("======================");
      console.log("INITIAL BOARD");
      console.log("======================");
      console.log(this.printBoard(this.initialBoard));
      console.log("");
      console.log("======================");
      console.log("SOLUTION");
      console.log("======================");
      console.log(this.printBoard(this.papan));
      return papan;
  }

  // Returns a string representing the current state of the board
  printBoard(prntBoard) {
    for(let i = 0;i<prntBoard.length;i++){
      let temp = "";
      for(let j = 0;j<prntBoard.length;j++){
        if(j===2||j===5){
          temp+= `${prntBoard[i][j]} | `;
        }
        else{
          temp+= `${prntBoard[i][j]}  `;
        }

      }
      if(i===3||i===6){
        console.log("----------------------------");
      }
      console.log(temp);
    }
  }

  //*Creating Initial Board
  createInitialBoard(papan1){
    let result = [];
    let counter = 0;
    while(counter<81){
      let tmp = [];
      for(let j = 0;j<9;j++){
        tmp.push(parseInt(papan1[counter]));
        counter++;
      }
      result.push(tmp);
    }
    return result;
  }

  //*Creating array that has not been filled yet
  findEmpty(){
    const result = [];
    let temp = [];
    for(let i = 0;i<9;i++){
      for(let j = 0;j<9;j++){
        if(this.papan[i][j]===0){
          temp.push(i);
          temp.push(j);
          result.push(temp);
          temp = [];
        }
      }
    }
    return result;
  }

  //*Checking column
  checkCol(num, coorY, papan){
    for(let i = 0;i<9;i++){
      if(papan[i][coorY] === num){
        return false;
      }
    }
    return true;
  }

  //*Checking Row
  checkRow(num, coorX, papan){
    for(let i = 0;i<9;i++){
      if(papan[coorX][i] === num){
        return false;
      }

    }
    return true;

  }

  //*Checking box
  checkBox(num, coorX, coorY){
    let tempCoorX = Math.floor(coorX/3)*3;
    let tempCoorY = Math.floor(coorY/3)*3;

    for(let i = tempCoorX;i<tempCoorX+3;i++){
      for(let j = tempCoorY;j<tempCoorY+3;j++){
        if(num===this.papan[i][j]){
          return false;
        }
      }
    }
    return true;
  }

  checkSafe(){
    return this.checkRow()&&this.checkCol()&&this.checkBox();
  }
  sleep (milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  }

  clearScreen () {
    // Un-comment this line if you have trouble with console.clear();
    // return process.stdout.write('\033c');
    console.clear();
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string);
//console.log(game.papan);


//console.log(game.solution);



// Remember: this will just fill out what it can and not "guess"
console.log(game.solve());
//console.log(game.board())
