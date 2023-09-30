import { Component, Input } from '@angular/core';
import { NavPage } from 'src/app/utils/interfaces';

@Component({
    selector: 'breadcrumb',
    templateUrl: 'breadcrumb.component.html',
    styleUrls: ['breadcrumb.component.css']
})

export class BreadcrumbComponent {

    @Input() breadcrumbItem: NavPage;

    constructor() { }

}
