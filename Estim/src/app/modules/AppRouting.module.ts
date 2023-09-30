import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstimatorComponent } from '../layout/main-content/estimator/estimator.component';
import { TravelingComponent } from '../layout/main-content/traveling/traveling.component';
import { MainNavBarComponent } from '../layout/main-nav-bar/main-nav-bar.component';
import { PlanningComponent } from '../layout/main-content/planning/planning.component';
import { BillingComponent } from '../layout/main-content/billing/billing.component';

const routes: Routes = [
  { path: 'estimator', component: EstimatorComponent },
  { path: 'traveling', component: TravelingComponent },
  { path: 'planner', component: PlanningComponent },
  { path: 'billing', component: BillingComponent },
  { path: '', redirectTo: '/estimator', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule] 
})
export class AppRoutingModule { }

export const RoutingComponents = [
  MainNavBarComponent,
  EstimatorComponent, 
  TravelingComponent,
  PlanningComponent,
  BillingComponent
];
