import { Component, Input, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Expense, Target } from 'src/app/utils/business-logic-interfaces';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ValueValidators } from '../../utils/utility-methods';

@Component({
    selector: 'estimate-report',
    templateUrl: 'estimate-report.component.html',
    styleUrls: ['estimate-report.component.css']
})

export class EstimateReportComponent {
    onFirstLoad: boolean = true;
    incomeControl: FormControl = new FormControl(null, [Validators.min(0), ValueValidators.notZeroValidator()]);
    savingsControl: FormControl = new FormControl(null, [Validators.min(0)]);
    tableElemets: Target[];
    noDataMessage: string = "No targets added.";
    titleInfoTooltip: string = 'Calculates the estimated time until the next financial goal can be achieved.';

    @Input() targets: Target[];
    @Input() expenses: Expense[];
    @Output() durationChangeEvent = new EventEmitter<Target[]>();

    constructor(private toastr: ToastrService) { 
        this.incomeControl.setValue(0);
        this.savingsControl.setValue(0);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!this.onFirstLoad) {
            this.updateTableData();
        } else {
            this.onFirstLoad = false;
        }
    }

    // Update chart data based on table elements
    private updateChartData() {
        this.durationChangeEvent.emit(this.tableElemets);
    }

    // Update table data based on target elements
    private updateTableData() {
        this.tableElemets = [...this.targets];
        this.calculateEstimateDuration();
    }

    /**
     * Calculates the estimated duration to achieve targets based on monthly income,
     * expenses, savings, and target costs.
     */
    calculateEstimateDuration(onButton?: boolean): void {
        if (!this.incomeControl.value) {
            if(onButton) {
                this.toastr.warning("Please add your income first!");
            }
            return;
        } else if (onButton && this.tableElemets.length < 1) {
            this.toastr.warning("Please add targets first!");
            this.updateChartData();
            return;
        }

        // Calculate total expenses from the list of expenses
        const totalExpenses: number = this.expenses.reduce((total, expense) => total + (expense?.cost || 0), 0);

        if (totalExpenses > this.incomeControl.value) {
            this.toastr.warning("Your expenses are higher than your income :(");
            return;
        }

        // Calculate the remaining balance after deducting expenses from income
        const remainingBalance: number = this.incomeControl.value - totalExpenses;

        let countMonth: number = 1;
        let moneyPull: number = remainingBalance + this.savingsControl.value;

        // Iterate through each target and calculate its estimated duration
        this.tableElemets.forEach(element => {
            if (!this.incomeControl.value) {
                element.duration = 0;
                return;
            }

            // Calculate the number of months required to achieve the target
            while (element.cost > moneyPull) {
                countMonth++;
                moneyPull += remainingBalance;
            }
            moneyPull -= element.cost;
            element.duration = countMonth;
        });
        this.updateChartData();
    }

    //Clear income and savings values
    clearValues(): void {
        this.incomeControl.setValue(0);
        this.savingsControl.setValue(0);
        this.calculateEstimateDuration();
    }

    // Handle drop event for reordering table elements
    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.tableElemets, event.previousIndex, event.currentIndex);
        if (this.incomeControl.value) this.calculateEstimateDuration();
    }
}
