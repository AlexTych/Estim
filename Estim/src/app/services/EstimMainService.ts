import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Expense, Target } from '../utils/business-logic-interfaces';

/**
 * Global (shared) app service.
 */
@Injectable({ providedIn: 'root' })
export class EstimMainService {

	// BehaviorSubjects to hold the current state of target, expense and estimator lists
	private targetListSubject = new BehaviorSubject<Target[]>([]);
	private expenseListSubject = new BehaviorSubject<Expense[]>([]);

	// Observable streams to which components can subscribe
	targetListSub = this.targetListSubject.asObservable();
	expenseListSub = this.expenseListSubject.asObservable();

	constructor() { }

	// Update the target list with new data
	onTargetListChange(targets: Target[]): void {
		this.targetListSubject.next(targets);
	}

	// Update the expense list with new data
	onExpenseListChange(expenses: Expense[]): void {
		this.expenseListSubject.next(expenses);
	}
}
