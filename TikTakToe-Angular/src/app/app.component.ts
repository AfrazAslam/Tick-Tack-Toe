import { Component } from '@angular/core';
import { BlockValue } from './block/block.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TikTakToe-Angular';
  public userXWon: boolean = false;
  public userYWon: boolean = false;
  public isDraw: boolean = false;

  
  public currentTurnX: BlockValue = BlockValue.X;
  
  public values: string[] = new Array(9);
  public selectedValuesX: number[] = [];
  public selectedValuesY: number[] = []
  public winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  
  // Sets the value of the block clicked by user and checks if user won
  public setValue(idx: number) {
    
    // If winning condition is alredy met then do nothing.
    const isGameAlreadyFinished = this.userXWon || this.userYWon
    if(isGameAlreadyFinished) return

    // If value is already selected then dont set it.
    const isValueAlreadySelected =  this.selectedValuesX.includes(idx)|| this.selectedValuesY.includes(idx);
    if (isValueAlreadySelected) return

    // If its x's turn then set value in x's selected values otherwise set in o's
    if (this.currentTurnX === BlockValue.X) {
      this.selectedValuesX.push(idx);
    } else {
      this.selectedValuesY.push(idx)
    }
    // Setting value to display
    this.values[idx] = (this.currentTurnX == BlockValue.X ? 'X' : "O");

    // Checking if adding new value results in a win.
    this.checkIfUserWon();
    
    // Changing turn.
    this.currentTurnX = this.currentTurnX == BlockValue.X ? BlockValue.O : BlockValue.X

    // If no user have won then check if game resulted in a draw or not
    if(!this.userXWon || !this.userYWon) this.checkIfDraw();

  }


  // Checks if any winning condition is met
  public checkIfUserWon() {

    this.userYWon = false
    this.userXWon = false
    let idx = this.winningConditions.findIndex(array => array.every(x => this.selectedValuesX.includes(x)));

    if (idx > -1) {
      this.userXWon = true;
      return
    }

    idx = this.winningConditions.findIndex(array => array.every(x => this.selectedValuesY.includes(x)));
    if (idx > -1) {
      this.userYWon = true;
      return
    }
  }

  // Checks if game resulted in a draw
  public checkIfDraw(){
    let state = true;
    for(let i = 0; i< this.values.length; i++){
        if(typeof this.values[i] == 'undefined'){
          state = false;
          break
        }
    }
    this.isDraw = state;
  }

  // Play again
  public restart(){
    
    this.selectedValuesY = [];
    this.selectedValuesX = [];
    this.values = new Array(9);
    
    this.userXWon = false;
    this.userYWon = false;

    this.currentTurnX = BlockValue.X
  }
}
