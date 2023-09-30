import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GreatingsDialoComponent } from './components/greatings-dialog/greatings-dialog.component';

/**
 * Main app component.
 */
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	userName: string;

	constructor(private dialog: MatDialog) { }

	ngOnInit(): void {
		// Check if userName is stored in sessionStorage
		const userName = sessionStorage.getItem("userName");

		if (userName && userName !== "Guest") {
			// If the user is not a guest, set the userName property
			this.userName = userName;
			return;
		}
		// If not found or guest, open the greetings dialog
		this.openGreatingsDialog();
	}

	// Open the greetings dialog
	private openGreatingsDialog(): void {
		const dialogRef = this.dialog.open(GreatingsDialoComponent);

		dialogRef.afterClosed().subscribe((result: string) => {
			if (result) {
				// If a result is provided, store it in sessionStorage and update userName
				sessionStorage.setItem("userName", result);
				this.userName = result;
			} else {
				// If no result, set userName to "Guest"
				this.userName = "Guest";
			}
		});
	}
}

