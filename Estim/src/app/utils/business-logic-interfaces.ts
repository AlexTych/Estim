import { ExpenseCategory, TargetPriority } from "./enums";

export interface Target {
    name: string;
    cost: number;
    priority: TargetPriority;
    duration: number;
}

export interface Expense {
    name: string;
    cost: number;
    category: ExpenseCategory;
}
