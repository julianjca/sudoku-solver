"use strict";

class Sudoku {
  constructor(board_string) {
    this.papan = this.createInitialBoard(board_string);
    this.solution = this.solve(this.papan);
  }

  solve(papan, row, col) {
    console.log("======================");
    console.log("INITIAL BOARD");
    console.log("======================");
    console.log(papan);
    console.log("");

    let solved = false;

    while(solved === false){
      console.log("Empty Coordinate");

      let coordinate = this.findEmpty();
      console.log(coordinate);
      let x = coordinate[0];
      let y = coordinate[1];

      for(let number = 1;number<=9;number++){
        let condition = false;
        while(this.checkSafe===false){
          this.checkRow(number, x, y);
          console.log(this.checkRow(number));
          this.checkCol(number, x, y);
          console.log(this.checkCol(number));
          this.checkBox(number, x, y);
          condition = this.checkSafe();
        }


      }
    }
  }

  // Returns a string representing the current state of the board
  printBoard() {

  }

  createInitialBoard(papan1){
    let result = [];
    let counter = 0;
    while(counter<81){
      let tmp = [];
      for(let j = 0;j<9;j++){
        tmp.push(papan1[counter]);
        counter++;
      }
      result.push(tmp);
    }
    return result;
  }

  findEmpty(){
    let coordinate = [-1,-1];
    let condition = true;
    for(let i = 0;i<9;i++){
      for(let j = 0;j<9;j++){
        if(this.papan[i][j]==="0"){
          coordinate[0] = i;
          coordinate[1] = j;
          condition = false;
          break;
        }
      }
      if(condition===false){
        break;
      }
    }
    return coordinate;
  }

  checkCol(num, coorX, coorY){
    for(let i = 0;i<9;i++){
      if(this.papan[i]===num){
        return false;
      } else{
        return true;
      }
    }
  }

  checkRow(num, coorX, coorY){

  }

  checkBox(num, coorX, coorY){

  }

  checkSafe(){
    return this.checkRow&&this.checkCol&&this.checkBox;
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
console.log(game.solution);



// Remember: this will just fill out what it can and not "guess"
//game.solve()
//console.log(game.board())
