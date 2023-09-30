import { Component } from '@angular/core';
import { navItems } from 'src/app/utils/constants';

@Component({
    selector: 'billing',
    templateUrl: 'billing.component.html',
    styleUrls: ['billing.component.css']
})

export class BillingComponent {
    
    breadcrumb = navItems['billing'];

    constructor() {}
}
