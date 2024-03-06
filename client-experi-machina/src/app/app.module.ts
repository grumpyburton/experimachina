import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import { SegmentListComponent } from './segment-list/segment-list.component';
import { ExperimentListComponent } from './experiment-list/experiment-list.component';
import { ControlListComponent } from './control-list/control-list.component';
import { SurveyListComponent } from './survey-list/survey-list.component';
import { HomeComponent } from './home/home.component';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {FormsModule} from "@angular/forms";
import {MatNativeDateModule} from "@angular/material/core";
import {EligibilityListComponent } from './eligibility-list/eligibility-list.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatDividerModule} from "@angular/material/divider";
import {FeatureListComponent } from './feature-list/feature-list.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";

@NgModule({
  declarations: [
    AppComponent,
    CustomerListComponent,
    SegmentListComponent,
    ExperimentListComponent,
    ControlListComponent,
    SurveyListComponent,
    HomeComponent,
    ConfirmDialogComponent,
    EligibilityListComponent,
    FeatureListComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatIconModule,
        MatMenuModule,
        MatPaginatorModule,
        MatTableModule,
        MatDialogModule,
        MatButtonModule,
        MatInputModule,
        MatSlideToggleModule,
        FormsModule,
        MatNativeDateModule,
        MatGridListModule,
        MatDividerModule,
        MatProgressBarModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
