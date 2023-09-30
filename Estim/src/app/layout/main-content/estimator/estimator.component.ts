import { Component, OnInit } from '@angular/core';
import { Expense, Target } from 'src/app/utils/business-logic-interfaces';
import { ColorElement, LineChartConfigurations, NavPage, TotalElement } from 'src/app/utils/interfaces';
import { ExpenseCategory, TargetPriority } from 'src/app/utils/enums';
import { navItems, priorityColors, categoryColors } from 'src/app/utils/constants';
import { EstimDataService } from 'src/app/services/EstimDataService';
import { EstimMainService } from 'src/app/services/EstimMainService';
import { ToastrService } from 'ngx-toastr';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'estimator',
  templateUrl: 'estimator.component.html',
  styleUrls: ['estimator.component.css']
})

export class EstimatorComponent implements OnInit {

  breadcrumb: NavPage = navItems['estimator'];
  totalPriorityData: TotalElement[];
  totalCategoryData: TotalElement[];
  evenTargetNumbers: number[] = [0, 2];
  evenExpenseNumbers: number[] = [0, 2, 4, 6];
  targetList: Target[];
  expenseList: Expense[];
  targetsLineChartConfig: LineChartConfigurations = {
    series: { name: '', data: [] },
    xAxisCategories: []
  };

  constructor(
    private $app: EstimMainService,
    private estimDataService: EstimDataService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    // Subscribe to changes in the target list
    this.$app.targetListSub.subscribe((targets: Target[]) => {
      this.targetList = targets;
      this.processTargetData(targets);
    });

    // Subscribe to changes in the expense list
    this.$app.expenseListSub.subscribe((expenses: Expense[]) => {
      this.expenseList = expenses;
      this.processExpenseData(expenses);
    });

    // Fetch initial data
    this.getData();
  }

  // Initializes an array of TotalElement with initial values based on a color set.
  private initializeTotalData(colorSet: ColorElement[]): TotalElement[] {
    return colorSet.map(x => ({
      text: x.text,
      count: 0,
      backgroundColor: x.backgroundColor,
      color: x.color
    }));
  }

  // Update the count property of a TotalElement based on a key and value.
  private updateTotalData(data: TotalElement[], key: string, value: number): void {
    const lastElementIdx: number = data.length - 1;
    const element = data.find(item => item.text === key);
    if (element) element.count += value;
    data[lastElementIdx].count += value;
  }

  // Update targets chart configuration
  updateTargetsDurationChartConfig(targets: Target[]): void {
    this.targetsLineChartConfig = {
      series: { name: "Months", data: targets.map((target: Target) => target.duration) },
      xAxisCategories: targets.map((target: Target) => target.name)
    };
  }

  // Fetche data from the API
  getData(): void {
    const targetsReq: Observable<Target[]> = this.estimDataService.getTargetsData();
    const expensesReq: Observable<Expense[]> = this.estimDataService.getExpensesData();
    forkJoin([targetsReq, expensesReq]).subscribe({
      next: (data: [Target[], Expense[]]) => {
        this.$app.onTargetListChange(data[0]);
        this.$app.onExpenseListChange(data[1]);
      },
      error: (error) => {
        this.toastr.error("Unable to retrieve data.");
      }
    });
  }

  /* Process targets data */
  processTargetData(targets: Target[]): void {
    if (!targets) return;

    this.totalPriorityData = this.initializeTotalData(priorityColors);
    for (const target of targets) {
      const priority: string = TargetPriority[target.priority];
      this.updateTotalData(this.totalPriorityData, priority, target.cost);
    }
  }

  /* Process expenses data */
  processExpenseData(expenses: Expense[]): void {
    if (!expenses) return;

    this.totalCategoryData = this.initializeTotalData(categoryColors);
    for (const expense of expenses) {
      const category: string = ExpenseCategory[expense.category];
      this.updateTotalData(this.totalCategoryData, category, expense.cost);
    }
  }
}
