import Component from '@ember/component';

  /*
  the following for loops and if statements work together to determine the winner
  originaly the winner variable is set as undefined, if there is found to be a winner then the winner variable is changed
  if none of the below patterns are met by one player then it moves onto setting the game as a draw, the winner variable stays as undefined
  but the draw variable is set to draw this then ends the game.
  to restart the game, the user presses the restart button, which then calls the start action below
  */
  function check_game_winner(state) {
      var patterns = [
        //first column
        [[0, 0], [0, 1], [0, 2], [0, 3]],
        [[0, 1], [0, 2], [0, 3], [0, 4]],
        [[0, 2], [0, 3], [0, 4], [0, 5]],
        //second column
        [[1, 0], [1, 1], [1, 2], [1, 3]],
        [[1, 1], [1, 2], [1, 3], [1, 4]],
        [[1, 2], [1, 3], [1, 4], [1, 5]],
        //third column
        [[2, 0], [2, 1], [2, 2], [2, 3]],
        [[2, 1], [2, 2], [2, 3], [2, 4]],
        [[2, 2], [2, 3], [2, 4], [2, 5]],
        //fourth column
        [[3, 0], [3, 1], [3, 2], [3, 3]],
        [[3, 1], [3, 2], [3, 3], [3, 4]],
        [[3, 2], [3, 3], [3, 4], [3, 5]],
        //fifth column
        [[4, 0], [4, 1], [4, 2], [4, 3]],
        [[4, 1], [4, 2], [4, 3], [4, 4]],
        [[4, 2], [4, 3], [4, 4], [4, 5]],
        //sixth column
        [[5, 0], [5, 1], [5, 2], [5, 3]],
        [[5, 1], [5, 2], [5, 3], [5, 4]],
        [[5, 2], [5, 3], [5, 4], [5, 5]],
        //seventh columnn
        [[6, 0], [6, 1], [6, 2], [6, 3]],
        [[6, 1], [6, 2], [6, 3], [6, 4]],
        [[6, 2], [6, 3], [6, 4], [6, 5]],
        //first row
        [[0, 0], [1, 0], [2, 0], [3, 0]],
        [[1, 0], [2, 0], [3, 0], [4, 0]],
        [[2, 0], [3, 0], [4, 0], [5, 0]],
        [[3, 0], [4, 0], [5, 0], [6, 0]],
        //second row
        [[0, 1], [1, 1], [2, 1], [3, 1]],
        [[1, 1], [2, 1], [3, 1], [4, 1]],
        [[2, 1], [3, 1], [4, 1], [5, 1]],
        [[3, 1], [4, 1], [5, 1], [6, 1]],
        //third row
        [[0, 2], [1, 2], [2, 2], [3, 2]],
        [[1, 2], [2, 2], [3, 2], [4, 2]],
        [[2, 2], [3, 2], [4, 2], [5, 2]],
        [[3, 2], [4, 2], [5, 2], [6, 2]],
        //fourth row
        [[0, 3], [1, 3], [2, 3], [3, 3]],
        [[1, 3], [2, 3], [3, 3], [4, 3]],
        [[2, 3], [3, 3], [4, 3], [5, 3]],
        [[3, 3], [4, 3], [5, 3], [6, 3]],
        //fifth row
        [[0, 4], [1, 4], [2, 4], [3, 4]],
        [[1, 4], [2, 4], [3, 4], [4, 4]],
        [[2, 4], [3, 4], [4, 4], [5, 4]],
        [[3, 4], [4, 4], [5, 4], [6, 4]],
        //sixth row
        [[0, 5], [1, 5], [2, 5], [3, 5]],
        [[1, 5], [2, 5], [3, 5], [4, 5]],
        [[2, 5], [3, 5], [4, 5], [5, 5]],
        [[3, 5], [4, 5], [5, 5], [6, 5]],
        //diagonals from top left to bottom right
        [[0,2], [1,3], [2,4], [3,5]],
        [[0,1], [1,2], [2,3], [3,4]],
        [[1,2], [2,3], [3,4], [4,5]],
        [[0,0], [1,1], [2,2], [3,3]],
        [[1,1], [2,2], [3,3], [4,4]],
        [[2,2], [3,3], [4,4], [5,5]],
        [[1,0], [2,1], [3,2], [4,3]],
        [[2,1], [3,2], [4,3], [5,4]],
        [[3,2], [4,3], [5,4], [6,5]],
        [[2,0], [3,1], [4,2], [5,3]],
        [[3,1], [4,2], [5,3], [6,4]],
        [[3,0], [4,1], [5,2], [6,3]],
        //diagonals from bottom left to top right
        [[0,3], [1,2], [2,1], [3,0]],
        [[0,4], [1,3], [2,2], [3,1]],
        [[1,3], [2,2], [3,1], [4,0]],
        [[0,5], [1,4], [2,3], [3,2]],
        [[1,4], [2,3], [3,2], [4,1]],
        [[2,3], [3,2], [4,1], [5,0]],
        [[1,5], [2,4], [3,3], [4,2]],
        [[2,4], [3,3], [4,2], [5,1]],
        [[3,3], [4,2], [5,1], [6,0]],
        [[2,5], [3,4], [4,3], [5,2]],
        [[3,4], [4,3], [5,2], [6,1]],
        [[3,5], [4,4], [5,3], [6,2]],
      ];
        for(var pidx = 0; pidx < patterns.length; pidx++) {
            var pattern = patterns[pidx];
            var winner = state[pattern[0][0]][pattern[0][1]];
            if(winner) {
                for(var idx = 1; idx < pattern.length; idx++) {
                    if(winner != state[pattern[idx][0]][pattern[idx][1]]) {
                        winner = undefined;
                        break;
                    }
                }
                if(winner) {
                  return winner;
                }
            }
        }
          for(var x = 0; x <= 6; x++) {
              for(var y = 0; y <= 5; y++) {
                  if(!state[x][y]) {
                    return undefined;
                    }
                }
            }
            return '';
  }

/* this function is called in the setTimeout function defined later in the document,
they work together to decide where the computer player may place the counters. The computer player
randomly places counters due to the math.random code.
*/
  function computer_move(state) {
  var moves = [];
  var loopEnd = Math.floor(Math.random() * 7 + 1);
  for(var idx1= 0; idx1 < loopEnd ; idx1++) {
    for(var idx2 = 0; idx2 < 6; idx2++){
      if(state[idx1][idx2] === undefined) {
        var move = {
          x:idx1,
          y:idx2,
        };
        moves.push(move);
      }
    }
  }

    var max_score = undefined;
    for(var idx = 0; idx < moves.length; idx++) {
      if(max_score === undefined || moves[idx].score > max_score) {
        max_score = moves[idx].score;
        move = {
          x: moves[idx].x,
          y: moves[idx].y
        }
      }
    }
    return move;
  }

    export default Component.extend({

      playing: false,
      winner: undefined,
      draw: true,

  didInsertElement: function() {
    /*
    Creates a varible stage and use createjs from EaselJS.
    allows us to add content to the stage
    the graphics property allows us to colour and draw the game board
    */
    var stage = new createjs.Stage(this.$('#stage')[0]);
    var board = new createjs.Shape();
    var graphics = board.graphics;

    //draws and colours the background square of the board
    graphics.beginFill('#4974ea');
    graphics.drawRect(0,0,360,360);

    // colours and draws the top row of cirlces on the blue board
    graphics.beginFill('#6d8cdf');
    graphics.drawCircle(25.75, 30, 20);
    graphics.drawCircle(77.25, 30, 20);
    graphics.drawCircle(128.75, 30, 20);
    graphics.drawCircle(180.25, 30, 20);
    graphics.drawCircle(231.75, 30, 20);
    graphics.drawCircle(283.25, 30, 20);
    graphics.drawCircle(334.75, 30, 20);

    // colours and draws the second row of cirlces on the blue board
    graphics.beginFill('#6d8cdf')
    graphics.drawCircle(25.75, 90, 20);
    graphics.drawCircle(77.25, 90, 20);
    graphics.drawCircle(128.75, 90, 20);
    graphics.drawCircle(180.25, 90, 20);
    graphics.drawCircle(231.75, 90, 20);
    graphics.drawCircle(283.25, 90, 20);
    graphics.drawCircle(334.75, 90, 20);

    // colours and draws the third row of cirlces on the blue board
    graphics.beginFill('#6d8cdf')
    graphics.drawCircle(25.75, 150, 20);
    graphics.drawCircle(77.25, 150, 20);
    graphics.drawCircle(128.75, 150, 20);
    graphics.drawCircle(180.25, 150, 20);
    graphics.drawCircle(231.75, 150, 20);
    graphics.drawCircle(283.25, 150, 20);
    graphics.drawCircle(334.75, 150, 20);

    // colours and draws the fourth row of cirlces on the blue board
    graphics.beginFill('#6d8cdf')
    graphics.drawCircle(25.75, 210, 20);
    graphics.drawCircle(77.25, 210, 20);
    graphics.drawCircle(128.75, 210, 20);
    graphics.drawCircle(180.25, 210, 20);
    graphics.drawCircle(231.75, 210, 20);
    graphics.drawCircle(283.25, 210, 20);
    graphics.drawCircle(334.75, 210, 20);

    // colours and draws the fifth row of cirlces on the blue board
    graphics.beginFill('#6d8cdf')
    graphics.drawCircle(25.75, 270, 20);
    graphics.drawCircle(77.25, 270, 20);
    graphics.drawCircle(128.75, 270, 20);
    graphics.drawCircle(180.25, 270, 20);
    graphics.drawCircle(231.75, 270, 20);
    graphics.drawCircle(283.25, 270, 20);
    graphics.drawCircle(334.75, 270, 20);

    // colours and draws the bottom row of cirlces on the blue board
    graphics.beginFill('#6d8cdf')
    graphics.drawCircle(25.75, 330, 20);
    graphics.drawCircle(77.25, 330, 20);
    graphics.drawCircle(128.75, 330, 20);
    graphics.drawCircle(180.25, 330, 20);
    graphics.drawCircle(231.75, 330, 20);
    graphics.drawCircle(283.25, 330, 20);
    graphics.drawCircle(334.75, 330, 20);

    board.alpha = 0;
    this.set('board', board);

    //adds the board graphics to the stage
    stage.addChild(board);

    /*
    creates a new variable called counters,
    this consists of two counters
    */
    var counters = {
      'red' : [],
      'computer' : []
    }

    /*
    draws the computer circle counter and colours it computer
    then draws the red circle counter and colours it red
    then pushes these counters onto the stage
    it then updates the stage so that the counters and board are visible
    */
    for(var x = 0; x < 21; x++){
      var computerCounter = new createjs.Shape();
      graphics = computerCounter.graphics;
      graphics.beginFill('#fff381');
      graphics.drawCircle(0, 0, 20);
      computerCounter.visible = false;
      stage.addChild(computerCounter);
      counters.computer.push(computerCounter);

      var redCounter = new createjs.Shape();
      graphics = redCounter.graphics;
      graphics.beginFill('#ff4c4c');
      graphics.drawCircle(0, 0, 20);
      redCounter.visible = false;
      stage.addChild(redCounter);
      counters.red.push(redCounter);
    }
    this.set('counters', counters);
    this.set('stage', stage);
    createjs.Ticker.addEventListener("tick", stage);
  },

/*
this function handles the click of the mouse
when the user clicks within the specified area of the board, their counter is placed
*/
  click: function(ev) {
    var component = this;
    if(component.get('playing') && !component.get('winner')) {
      if(ev.target.tagName.toLowerCase() == 'canvas' && ev.offsetX >= 0 && ev.offsetY >= 0 && ev.offsetX < 360 && ev.offsetY < 360) {
        var x = Math.floor((ev.offsetX - 0) / 51.4285714);
        var y = Math.floor((ev.offsetY - 0) / 60);
        var state = component.get('state');


        /*
        creates a new varible that holds the number of spaces in the column
        this makes sure that no matter where in the column the user clicks,
        their counter will always be placed in the lowest available space within that column
        */

        var columnLength = state[0].length;
        for (y = 1; y < columnLength; y++) {
          if(state[x][y]){
            break;
          }
        }
        y = y - 1;

        /*
        the if statement below creates many new variables setting the player, the number of moves and the counters
        it sets where the counters for each player are to be placed
        this calls the function above where the counters were created
        and places the relevant counter (either red or computer)
        */
        if(!state[x][y]) {
          var move_count = component.get('moves')['red'];
          var counter = component.get('counters')['red'][move_count];
          state[x][y] = 'red';
          counter.visible = true;
          counter.x = 27 + x * 51.4285714;
          counter.y = 30 + y * 60;
          component.check_winner();
          component.get('moves')['red'] = move_count + 1;

          /*
          the setTimeout function links with the computer_move function and defines the
          computer player and the number of moves. It defines where the computer can place

          */
          setTimeout (function(){
            if(!component.get('winner') && !component.get('draw')) {
              var move = computer_move(state);
              move_count = component.get('moves')['computer'];
              state[move.x][move.y] = 'computer';
              counter = component.get('counters')['computer'][move_count];
              counter.visible = true;
              counter.x = 26 + move.x * 51.4285714;
              counter.y = 30 + move.y * 60;
              component.get('moves')['computer'] = move_count + 1;
              component.get('stage').update();
              component.check_winner();
            }
          }, 100);
        }
      }
    }
  },

  /*
  the next function finds whether there has been a winner and if not it then goes to a draw,
  all the iwnning patterns are defined in the check_game_winner function above
  */

  check_winner: function() {
    var state = this.get('state');
    var winner = check_game_winner(state);
    if(winner !== undefined) {
      if(winner === '') {
        this.set('draw', true);
      } else {
        this.set('winner', winner);
      }
    }
  },



/*
this action is created so that when he user presses the start function they can start playing tha game
the restart button is also linked to this function as they both do the same thing. When the start button
is clicked, the board fades in as this links to the createjs included.
*/

  actions: {
    start: function() {
      var board = this.get('board');
      board.alpha = 0;
      createjs.Tween.get(board).to({alpha: 1}, 1000);
      this.set('playing', true);
      this.set('winner', undefined);
      this.set('draw', false);
      this.set('state', [
        [undefined, undefined, undefined, undefined, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined, undefined]]);
        this.set('moves', {'red': 0, 'computer': 0});
        this.set('player', 'red');
        var counters = this.get('counters');
        for(var idx = 0; idx < 21; idx++) {
          counters.red[idx].visible = false;
          counters.computer[idx].visible = false;
        }
        this.get('stage').update();
      }
    }
  });
