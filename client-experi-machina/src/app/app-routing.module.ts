import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomerListComponent} from "./customer-list/customer-list.component";
import {SegmentListComponent} from "./segment-list/segment-list.component";
import {ExperimentListComponent} from "./experiment-list/experiment-list.component";
import {ControlListComponent} from "./control-list/control-list.component";
import {SurveyListComponent} from "./survey-list/survey-list.component";
import {HomeComponent} from "./home/home.component";
import {EligibilityListComponent} from "./eligibility-list/eligibility-list.component";
import {FeatureListComponent} from "./feature-list/feature-list.component";
import {AudienceFinderComponent} from "./audience-finder/audience-finder.component";
import {AudienceListComponent} from "./audience-list/audience-list.component";

const routes: Routes = [
  { path: 'audienceFinder', component: AudienceFinderComponent },
  { path: 'audience', component: AudienceListComponent },
  { path: 'controls', component: ControlListComponent },
  { path: 'customers', component: CustomerListComponent },
  { path: 'experiments', component: ExperimentListComponent },
  { path: 'eligibilities', component: EligibilityListComponent },
  { path: 'features', component: FeatureListComponent },
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
