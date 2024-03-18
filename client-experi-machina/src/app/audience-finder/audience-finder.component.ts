import {AfterViewInit, Component, inject} from '@angular/core';
import {ApiService} from "../api.service";
import {Survey} from "../survey";
import {Feature} from "../feature";
import {Experiment} from "../experiment";
import {Control} from "../control";
import {FormBuilder, Validators} from "@angular/forms";
import {Statistics} from "../statistics";
import {Segment} from "../segment";
import {Customer} from "../customer";

@Component({
    selector: 'app-audience-finder',
    templateUrl: './audience-finder.component.html',
    styleUrls: ['./audience-finder.component.css']
})
export class AudienceFinderComponent implements AfterViewInit {

    apiService: ApiService = inject(ApiService);

    selectedGroupType: string | null = "";
    groupList: any[];
    selectedGroup: Survey | Feature | Experiment | Control | null;
    customersAvailable = 0;

    statistics: Statistics = {
      controls: 0, customers: 0, eligibilities: 0, experiments: 0, features: 0, segments: 0, surveys: 0
    };

    controlList: Control[] = [];
    featureList: Feature[] = [];
    experimentList: Experiment[] = [];
    surveyList: Survey[] = [];

    firstFormGroup = this._formBuilder.group({
        selectedGroupTypeCtrl: ['', Validators.required],
        selectedGroupCtrl: ['', Validators.required],
    });
    secondFormGroup = this._formBuilder.group({
      excludeActive: ['', Validators.required]
    } );

    isEditable = true;

    constructor(private _formBuilder: FormBuilder) {
      // TODO: we're assuming no one is making changes here at the moment
      //       so loading all the lists once and using them for performance
      //       reasons - need to look at this in the long run
      // Get stats
      this.apiService.getStatistics().subscribe(statistics =>
          this.statistics = statistics);
      // Get each of the controls, experiments, features and survey lists for exclusions
      this.apiService.getFeatures(true).subscribe(list =>
          this.featureList = list);
      this.apiService.getExperiments(true).subscribe(list =>
          this.experimentList = list);
      this.apiService.getControls(true).subscribe(list =>
          this.controlList = list);
      this.apiService.getSurveys(true).subscribe(list =>
          this.surveyList = list);
    }

    loadSelectedGroup() {
    }

    loadCustomerCountBySegments() {

        var customerList: Customer[] = [];
        if (this.selectedGroup != null) {
            if(this.selectedGroup.eligibilities == null || this.selectedGroup.eligibilities.length == 0)
            {
              console.log("No eligibility set - is this a mistake?");
              this.customersAvailable = this.statistics.customers;
            }
            else
            {
              //console.log("We have {} eligibility sets", this.selectedGroup.eligibilities.length);
              //console.log(this.selectedGroup);
              //console.log("-----------------");
              // Get back to having a list of segments
              var segList: Segment[] = [];
              this.selectedGroup.eligibilities.forEach(eligibility =>
                  eligibility.segments.forEach(seg => segList.push(seg)));

              this.apiService.getCustomersBySegments(segList).subscribe(cList =>
                {
                  //customerList = cList;
                  this.customersAvailable = cList.length;
                  //console.log(cList);
                }
              );
            }
        }
    }

    loadGroupTypeList() {
        this.selectedGroupType = this.firstFormGroup.controls.selectedGroupTypeCtrl.value;
        this.selectedGroup = null;
        if (this.firstFormGroup.controls.selectedGroupTypeCtrl.value != null &&
            this.firstFormGroup.controls.selectedGroupTypeCtrl.value == "Survey") {
            this.apiService.getSurveys(true).subscribe(list =>
                this.groupList = list);
        }
        if (this.firstFormGroup.controls.selectedGroupTypeCtrl.value != null &&
            this.firstFormGroup.controls.selectedGroupTypeCtrl.value == "Control Group") {
            this.apiService.getControls(true).subscribe(list =>
                this.groupList = list);
        }
        if (this.firstFormGroup.controls.selectedGroupTypeCtrl.value != null &&
            this.firstFormGroup.controls.selectedGroupTypeCtrl.value == "Experiment") {
            this.apiService.getExperiments(true).subscribe(list =>
                this.groupList = list);
        }
        if (this.firstFormGroup.controls.selectedGroupTypeCtrl.value != null &&
            this.firstFormGroup.controls.selectedGroupTypeCtrl.value == "Feature") {
            this.apiService.getFeatures(true).subscribe(list =>
                this.groupList = list);
        }
    }

    ngAfterViewInit(): void {
        this.firstFormGroup.controls.selectedGroupTypeCtrl.valueChanges.subscribe(val => {
            const formattedMessage = `selectedGroupTypeCtrl is ${val}.`;
            //console.log(formattedMessage);
        });

        this.firstFormGroup.controls.selectedGroupCtrl.valueChanges.subscribe(val => {
            //console.log(val);
            this.selectedGroup = val as Survey | Feature | Experiment | Control | null;
        });
    }

}