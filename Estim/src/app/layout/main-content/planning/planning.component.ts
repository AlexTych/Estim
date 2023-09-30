import { Component } from '@angular/core';
import { navItems } from 'src/app/utils/constants';

@Component({
    selector: 'planning',
    templateUrl: 'planning.component.html',
    styleUrls: ['planning.component.css']
})

export class PlanningComponent {

    breadcrumb = navItems['planner'];

    constructor() {}
}
