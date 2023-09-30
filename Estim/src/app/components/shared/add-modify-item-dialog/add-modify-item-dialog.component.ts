import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExpenseCategory, TargetPriority } from 'src/app/utils/enums';
import { Convert } from '../../../utils/utility-methods';
import { FormControl, Validators } from '@angular/forms';
import { ValueValidators } from '../../../utils/utility-methods';

interface DialogData {
    title: string;
    dataType: number;
    element?: any;
    modifyType: boolean;
}

@Component({
    templateUrl: 'add-modify-item-dialog.component.html',
    styleUrls: ['add-modify-item-dialog.component.css']
})
export class AddItemDialoComponent {
    maxAllowedCost = 1000000;
    priorities: TargetPriority[] = [TargetPriority.High, TargetPriority.Medium, TargetPriority.Low];
    categories: ExpenseCategory[] = [
        ExpenseCategory.Bills,
        ExpenseCategory.Groceries,
        ExpenseCategory.Housing,
        ExpenseCategory.Other,
        ExpenseCategory.Restaurants,
        ExpenseCategory.Utilities
    ];
    itemCostControl: FormControl = new FormControl(null, [Validators.min(0), ValueValidators.notZeroValidator()]);
    item: any;
    title: string;

    constructor(
        public dialogRef: MatDialogRef<AddItemDialoComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {
        // Initialize item based on data type
        this.item = this.data.dataType === 0 ? this.initializeTargetItem() : this.initializeExpenseItem();
        this.title = data.title;
        this.itemCostControl.setValue(this.item.cost);
    }

    // Initialize a target item
    private initializeTargetItem(): any {
        return { name: this.data.element?.name || '', cost: this.data.element?.cost || 0, priority: this.data.element?.priority || TargetPriority.Low };
    }

    // Initialize a expense item
    private initializeExpenseItem(): any {
        return { name: this.data.element?.name || '', cost: this.data.element?.cost || 0, category: this.data.element?.category || ExpenseCategory.Other };
    }

    // Modify cost value
    onCostChange(): void {
      this.item.cost = this.itemCostControl.value;
    }

    // Check if the "OK" button should be disabled
    okDisabled(): boolean {
        return this.item.name === '' || !this.item.cost || this.itemCostControl.value < 0 || this.item.cost > 1000000;
    }

    // Get the text representation of a target priority
    getPriorityText(priority: TargetPriority): string {
        return Convert.getPriorityText(priority);
    }

    // Get the text representation of an expense category
    getCategoryText(category: ExpenseCategory): string {
        return Convert.getCategoryText(category);
    }
}