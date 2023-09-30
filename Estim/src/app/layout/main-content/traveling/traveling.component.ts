import { Component } from '@angular/core';
import { navItems } from 'src/app/utils/constants';

@Component({
    selector: 'traveling',
    templateUrl: 'traveling.component.html',
    styleUrls: ['traveling.component.css']
})

export class TravelingComponent {
    
    breadcrumb = navItems['traveling'];

    constructor() {}
}
