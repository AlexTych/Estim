import { ExpenseCategory, TargetPriority } from "./enums";
import { ValidatorFn, AbstractControl } from '@angular/forms';

export class Convert {

    // Function to get the text representation of an expense category
    static getCategoryText(category: ExpenseCategory): string {
        switch (category) {
            case ExpenseCategory.Bills: return "Bills";
            case ExpenseCategory.Groceries: return "Groceries";
            case ExpenseCategory.Housing: return "Housing";
            case ExpenseCategory.Other: return "Other";
            case ExpenseCategory.Restaurants: return "Restaurants";
            case ExpenseCategory.Utilities: return "Utilities";
        }
    }

    // Function to get the color associated with an expense category
    static getCategoryColor(category: ExpenseCategory): string {
        switch (category) {
            case ExpenseCategory.Bills: return "#fec107";
            case ExpenseCategory.Groceries: return "#00c292";
            case ExpenseCategory.Housing: return "#fb9678";
            case ExpenseCategory.Other: return "#78909C";
            case ExpenseCategory.Restaurants: return "#A1887F";
            case ExpenseCategory.Utilities: return "#BA68C8";
        }
    }

    // Function to get the text representation of a priority level
    static getPriorityText(priority: TargetPriority): string {
        switch (priority) {
            case TargetPriority.High: return "High";
            case TargetPriority.Medium: return "Medium";
            case TargetPriority.Low: return "Low";
        }
    }

    // Function to get the color associated with a priority level
    static getPriorityColor(priority: TargetPriority): string {
        switch (priority) {
            case TargetPriority.High: return "#fb9678";
            case TargetPriority.Medium: return "#fec107";
            case TargetPriority.Low: return "#00c292";
        }
    }

    // Function to get the icon associated with an expense category
    static getCategoryIcon(category: ExpenseCategory): string {
        switch (category) {
            case ExpenseCategory.Housing: return 'fa-solid fa-house fa-lg';
            case ExpenseCategory.Bills: return 'fa-solid fa-light fa-file-invoice-dollar fa-lg';
            case ExpenseCategory.Groceries: return 'fa-solid fa-cart-shopping fa-lg';
            case ExpenseCategory.Restaurants: return 'fa-solid fa-utensils fa-lg';
            case ExpenseCategory.Utilities: return 'fa-solid fa-faucet fa-lg';
            case ExpenseCategory.Other: return 'fa-solid fa-dollar-sign fa-lg';
        }
    }
}

export class ValueValidators {

    // Zero form validators
    static notZeroValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            return control.value === 0 ? { notStartingWithZero: true } : null;
        };
    }
}
