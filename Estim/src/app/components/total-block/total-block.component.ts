import { Component, Input } from '@angular/core';
import { TotalElement } from 'src/app/utils/interfaces';

@Component({
  selector: 'total-block',
  templateUrl: 'total-block.component.html',
  styleUrls: ['total-block.component.css']
})

export class TotalBlockComponent {
  
  @Input() totalEl: TotalElement;

  constructor() { }

}
