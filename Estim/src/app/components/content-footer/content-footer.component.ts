import { Component } from '@angular/core';

@Component({
  selector: 'content-footer',
  templateUrl: 'content-footer.component.html',
  styleUrls: ['content-footer.component.css']
})

export class ContentFooterComponent {

  currentYear: number;

  constructor() {
    this.currentYear = new Date().getFullYear();
  }
}
