import { Component, Input } from '@angular/core';
import { navItems } from '../../utils/constants';
import { NavPage } from 'src/app/utils/interfaces';

@Component({
  selector: 'main-header',
  templateUrl: 'main-header.component.html',
  styleUrls: ['main-header.component.css']
})

export class MainHeaderComponent {

  navPages: NavPage[];
  @Input() userName: string;

  constructor() {
    this.navPages = Object.values(navItems);
  }
}
