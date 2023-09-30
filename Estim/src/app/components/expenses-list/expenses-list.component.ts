import { Component, ViewChild, ChangeDetectorRef, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Expense } from 'src/app/utils/business-logic-interfaces';
import { ExpenseCategory } from 'src/app/utils/enums';
import { MatDialog } from '@angular/material/dialog';
import { AddItemDialoComponent } from 'src/app/components/shared/add-modify-item-dialog/add-modify-item-dialog.component';
import { EstimMainService } from 'src/app/services/EstimMainService';
import { Convert } from 'src/app/utils/utility-methods';
import { ToastrService } from 'ngx-toastr';
import { AddModifyDialogData } from 'src/app/utils/interfaces';

@Component({
  selector: 'expenses-list',
  templateUrl: 'expenses-list.component.html',
  styleUrls: ['expenses-list.component.css']
})

export class ExpensesListComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'cost', 'category', 'actions'];
  dataSource: MatTableDataSource<Expense, MatTableDataSourcePaginator>;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private $app: EstimMainService, 
    private cdRef: ChangeDetectorRef, 
    private dialog: MatDialog,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    // Subscribe to changes in the expense list
    this.$app.expenseListSub.subscribe((expenses: Expense[]) => {
      this.updateDataSource(expenses);
    });
  }

  // Updates the data source for the table
  private updateDataSource(expenses: Expense[]): void {
    this.dataSource = new MatTableDataSource<Expense>(expenses);
    this.dataSource.sort = this.sort;
    this.cdRef.detectChanges();
  }

  // Updates the list of expenses
  private updateExpenses(expenses: Expense[]): void {
    this.$app.onExpenseListChange(expenses);
  }

  /* Remove Expense from the list */
  removeExpense(expenseName: string, selectedIndex: number): void {
    const expenses: Expense[] = this.dataSource.filteredData.filter((expense, i) => i !== selectedIndex);
    this.updateExpenses(expenses);
    this.toastr.success(`${expenseName} removed successfully!`);
  }

  // Opens a dialog for adding or modifying an expense
  addModifyExpense(expense?: Expense, index?: number): void {
    const data: AddModifyDialogData = {
      title: index !== undefined ? "Modify Expense" : "Add Expense", 
      element: expense, 
      dataType: 1
    }
    const dialogRef = this.dialog.open(AddItemDialoComponent, {
      data: data,
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe((el: Expense) => {
      if (!el) return;
      let expenses = [...this.dataSource.filteredData];
      if (expense && index != undefined) {
        expenses[index] = el;
        this.toastr.success('Expense modified successfully!');
      } else {
        expenses.push(el);
        this.toastr.success('Expense added successfully!');
      }
      this.updateExpenses(expenses);
    });
  }

  /* Clear Expense list */
  resetValues(): void {
    if(this.dataSource.data.length < 1) {
      return;
    }
    this.updateExpenses([]);
    this.toastr.success('Expense list cleared!');
  }

  // Gets the icon for a given expense category
  getCategoryIcon(category: ExpenseCategory): string {
    return Convert.getCategoryIcon(category);
  }

  // Gets the tooltip text for a given expense category
  getCategoryTooltip(category: ExpenseCategory): string {
    return Convert.getCategoryText(category);
  }

  // Gets the color of a given expense category
  getCategoryColor(category: ExpenseCategory): string {
    return Convert.getCategoryColor(category);
  }
}
