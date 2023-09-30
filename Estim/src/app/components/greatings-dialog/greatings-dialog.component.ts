import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
    templateUrl: 'greatings-dialog.component.html',
    styleUrls: ['greatings-dialog.component.css']
})
export class GreatingsDialoComponent {

    userName: string;

    constructor(public dialogRef: MatDialogRef<GreatingsDialoComponent>) { }
}