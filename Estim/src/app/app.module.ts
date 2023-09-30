import { NgModule } from '@angular/core';
import { AppRoutingModule, RoutingComponents } from './modules/AppRouting.module';
import { AppComponent } from './app.component';
import { AngularMaterialModule } from './modules/AngularMaterial.module';
import { NgbAlertModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { GreatingsDialoComponent } from './components/greatings-dialog/greatings-dialog.component';
import { EstimMainService } from './services/EstimMainService';
import { TartgetListComponent } from './components/target-list/target-list.component';
import { ExpensesListComponent } from './components/expenses-list/expenses-list.component';
import { MainHeaderComponent } from './layout/main-header/main-header.component';
import { EstimateReportComponent } from './components/estimate-report/estimate-report.component';
import { ContentFooterComponent } from './components/content-footer/content-footer.component';
import { TotalBlockComponent } from './components/total-block/total-block.component';
import { BreadcrumbComponent } from './components/shared/breadcrumb/breadcrumb.component';
import { PercentageCalculatorComponent } from './components/percentage-calculator/percentage-calculator.component';
import { NavBarFooterComponent } from './components/nav-bar-footer/nav-bar-footer.component';
import { EstimDataService } from './services/EstimDataService';
import { AddItemDialoComponent } from './components/shared/add-modify-item-dialog/add-modify-item-dialog.component';
import { ToastrModule  } from 'ngx-toastr';
import { LineChartComponent  } from './components/charts/line-chart/line-chart.component';
import { NoDataComponent } from './components/shared/no-data/no-data.component';

@NgModule({
	declarations: [
		AppComponent,
		RoutingComponents,
		GreatingsDialoComponent,
		AddItemDialoComponent,
		TartgetListComponent,
		ExpensesListComponent,
		MainHeaderComponent,
		ContentFooterComponent,
		EstimateReportComponent,
		TotalBlockComponent,
		BreadcrumbComponent,
		PercentageCalculatorComponent,
		NavBarFooterComponent,
		LineChartComponent,
  NoDataComponent
	],
	imports: [
		AppRoutingModule,
		AngularMaterialModule,
		NgbModule,
		NgbPaginationModule,
		NgbAlertModule,
		ToastrModule.forRoot()
	],
	providers: [EstimMainService, EstimDataService],
	bootstrap: [AppComponent]
})
export class AppModule { }
