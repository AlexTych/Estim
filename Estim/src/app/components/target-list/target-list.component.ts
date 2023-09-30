import { Component, ViewChild, ChangeDetectorRef, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Target } from 'src/app/utils/business-logic-interfaces';
import { AddItemDialoComponent } from 'src/app/components/shared/add-modify-item-dialog/add-modify-item-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { EstimMainService } from 'src/app/services/EstimMainService';
import { TargetPriority } from 'src/app/utils/enums';
import { Convert } from 'src/app/utils/utility-methods';
import { ToastrService } from 'ngx-toastr';
import { AddModifyDialogData } from 'src/app/utils/interfaces';

@Component({
  selector: 'target-list',
  templateUrl: 'target-list.component.html',
  styleUrls: ['target-list.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})

export class TartgetListComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'cost', 'priority', 'actions'];
  dataSource: MatTableDataSource<Target, MatTableDataSourcePaginator>;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private $app: EstimMainService,
    private cdRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    // Subscribe to changes in the target list
    this.$app.targetListSub.subscribe((targets: Target[]) => {
      const sortedTargets: Target[] = targets.sort((a, b) => a.priority - b.priority);
      this.updateDataSource(sortedTargets);
    });
  }

  // Updates the data source for the table
  private updateDataSource(expenses: Target[]): void {
    this.dataSource = new MatTableDataSource<Target>(expenses);
    this.dataSource.sort = this.sort;
    this.cdRef.detectChanges();
  }

  // Updates the list of targets
  private updateTargets(targets: Target[]): void {
    this.$app.onTargetListChange(targets);
  }

  // Opens a dialog for adding or modifying a target
  addModifyTarget(target?: Target, index?: number): void {
    const data: AddModifyDialogData = {
      title: index !== undefined ? "Modify Target" : "Add Target",
      element: target,
      dataType: 0
    }
    const dialogRef = this.dialog.open(AddItemDialoComponent, {
      data: data,
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe((el: Target) => {
      if (!el) return;
      let targets = [...this.dataSource.filteredData];
      if (target && index != undefined) {
        targets[index] = el;
        this.toastr.success('Target modified successfully!');
      } else {
        targets.push(el);
        this.toastr.success('Target added successfully!');
      }
      this.updateTargets(targets);
    });
  }

  /* Clear Targets list */
  resetValues(): void {
    if(this.dataSource.data.length < 1) {
      return;
    }
    this.updateTargets([]);
    this.toastr.success('Target list cleared!');
  }

  /* Remove Target from the list */
  removeTarget(targetName: string, selectedIndex: number) {
    const targets = this.dataSource.filteredData.filter((target, i) => i !== selectedIndex);
    this.updateTargets(targets);
    this.toastr.success(`${targetName} removed successfully!`);
  }

  // Get the text representation of a target priority
  getPriorityText(priority: TargetPriority): string {
    return Convert.getPriorityText(priority);
  }

  // Get the text representation of a target priority
  getPriorityColor(priority: TargetPriority): string {
    return Convert.getPriorityColor(priority);
  }
}