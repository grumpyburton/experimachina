import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomerListComponent} from "./customer-list/customer-list.component";
import {SegmentListComponent} from "./segment-list/segment-list.component";
import {ExperimentListComponent} from "./experiment-list/experiment-list.component";
import {ControlListComponent} from "./control-list/control-list.component";
import {SurveyListComponent} from "./survey-list/survey-list.component";
import {HomeComponent} from "./home/home.component";
import {EligibilityListComponent} from "./eligibility-list/eligibility-list.component";

const routes: Routes = [
  { path: 'controls', component: ControlListComponent },
  { path: 'customers', component: CustomerListComponent },
  { path: 'experiments', component: ExperimentListComponent },
  { path: 'eligibilies', component: EligibilityListComponent },
  { path: 'home', component: HomeComponent },
  { path: 'segments', component: SegmentListComponent },
  { path: 'surveys', component: SurveyListComponent },
  { path: '**', component: HomeComponent },
  { path: '404', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
