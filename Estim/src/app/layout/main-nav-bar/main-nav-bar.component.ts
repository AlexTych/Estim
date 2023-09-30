import { Component, OnInit } from '@angular/core';
import { navItems } from 'src/app/utils/constants';
import { NavPage } from 'src/app/utils/interfaces';
import { Location } from '@angular/common';

@Component({
    selector: 'main-nav-bar',
    templateUrl: 'main-nav-bar.component.html',
    styleUrls: ['main-nav-bar.component.css']
})

export class MainNavBarComponent implements OnInit {

    navPages: NavPage[];

    constructor(private location: Location) { }

    ngOnInit(): void {
        this.navPages = Object.values(navItems);

        // Get current URL
        const currentUrl: string = this.location.path();

        // Find the current page based on URL
        const currentPage: NavPage | undefined = this.navPages.find(page => page.link == currentUrl);

        // If found, highlight it
        if (currentPage) currentPage.color = '#673ab7';
    }

    // Handler for when a navigation item is selected
    onNavSelect(selectedIndex: number): void {
        // Find the currently active element
        const activeElement: NavPage | undefined = this.navPages.find(el => el.color === "#673ab7");

        // If found, reset its color
        if (activeElement) activeElement.color = "#212529";

        // Set the selected item's color to active
        this.navPages[selectedIndex].color = "#673ab7";
    }
}
