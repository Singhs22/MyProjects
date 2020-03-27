//Sharanjit Singh
//02/07/2020
// Tic Tac Toe

var Agent = function (move, utility) {
   this.move = move;
    this.utility = utility;
}

Agent.prototype.selectMove = function(board) {
 
    var size = freeCells(board), cell;
    var result = minimax(board, cell, size);
    return result.move;
}

function getMoves(board){
  var freeCells = [];
  for (var i = 1; i < 10; i++) {
      if (board.cellFree(i)){
       freeCells.push(i);
  }
}return freeCells; }

function freeCells(board) {
  var emptySpace = [];
  for (var i = 1; i < 10; i++) {
      if (board.cellFree(i)) emptySpace++;
  } return emptySpace;}

function minimax(board, depth, size) {     
    var move, utility,availabeMove;
    
    var result = new Agent(depth, utility);
    if (board.gameOver() !== 0) {
      var winner = board.gameOver();
        result.utility= (winner === 1) ? 1:(winner === 2) ? -1 : 0;
        return result;
    }
    if (board.playerOne) {      //(AI) first player move(max)
      var playMove = getMoves(board);
      
        for (var i = 0; i < playMove.length; i++) {   //check all possible moves
            var cBoard = board.clone();             
            cBoard.move(playMove[i]);
            availabeMove = playMove[i];
            result = minimax(cBoard, playMove[i]);
              if (move === undefined) {
                move =  depth === undefined ? availabeMove : depth; }
            if (utility === undefined || utility < result.utility) {
                utility = result.utility;
                move = playMove.length == size ? availabeMove : 0;
            }
        }
    }else {   //second player turn(min)
      var playMove1 = getMoves(board);
      for (var i = 0; i < playMove1.length; i++) {
          var cBoard = board.clone();          
          cBoard.move(playMove1[i]);
          availabeMove = playMove1[i];
          result = minimax(cBoard, playMove1[i]);
         if (move === undefined) {
        move =  depth === undefined ? availabeMove : depth;
             }
           if (utility === undefined ||utility > result.utility) {
                utility = result.utility;
                move = playMove1.length == size ? availabeMove : 0;
            }
          } 
    }
    return new Agent(move, utility) ;
}



