import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})
export class BlockComponent {
  public blockValue = BlockValue
  @Input() value:string = '';

}

export enum BlockValue {
  X = "X",
  O = "O"
}
