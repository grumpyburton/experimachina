import {AfterViewInit, Component, inject, ViewChild} from '@angular/core';
import {ApiService} from "../api.service";
import {Survey} from "../survey";
import {Feature} from "../feature";
import {Experiment} from "../experiment";
import {Control} from "../control";
import {FormBuilder, Validators} from "@angular/forms";
import {Statistics} from "../statistics";
import {Segment} from "../segment";
import {Customer} from "../customer";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Audience} from "../audience";
import {Router} from "@angular/router";

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
    dataSource = new MatTableDataSource<Customer>([]);
    displayedColumns: string[] = ['actions','id','key', 'firstName','surname'];
    @ViewChild(MatPaginator) paginator: MatPaginator;

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
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],

    });
    secondFormGroup = this._formBuilder.group({
      excludeActive: ['']
    } );
    thirdFormGroup = this._formBuilder.group({
        audienceSize: ['', Validators.required]
    } );
    fourthFormGroup = this._formBuilder.group({
        name: ['', Validators.required],
        description: ['']
    } );

    isEditable = true;

    constructor(private _formBuilder: FormBuilder, private router: Router) {
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

    selectRandomCustomers()
    {
        console.log("selecting "+this.thirdFormGroup.controls.audienceSize.value+" customers from "+this.customersAvailable ,);
        var selectedCustomers = this.dataSource.data;
        var size: number = Number(this.thirdFormGroup.controls.audienceSize.value);
        selectedCustomers = selectedCustomers.sort((a, b) => 0.5 - Math.random());
        selectedCustomers = selectedCustomers.splice(0, size);
        console.log(selectedCustomers);
        this.dataSource.data = selectedCustomers;
    }

    createAudience()
    {
        console.log("saveAudience");
        if(this.fourthFormGroup.valid)
        {
            var audience:Audience = {
                active: true,
                createDate: "",
                customers: this.dataSource.data,
                description: this.fourthFormGroup.controls.description.value,
                endDate: this.firstFormGroup.controls.endDate.value,
                expireDate: "",
                id: 0,
                name: this.fourthFormGroup.controls.name.value,
                startDate: this.firstFormGroup.controls.startDate.value,
                updateDate: "",
                type: this.firstFormGroup.controls.selectedGroupTypeCtrl.value,
                controlGroup: null,
                experiment: null,
                feature: null,
                survey: null
            };

            // TODO: can get rid of this is i can work out JPA and abstract classes...
            switch(audience.type) {
                case "Control Group":
                    audience.controlGroup = this.firstFormGroup.controls.selectedGroupCtrl.value;
                    break;
                case "Experiment":
                    audience.experiment = this.firstFormGroup.controls.selectedGroupCtrl.value;
                    break;
                case "Feature":
                    audience.feature = this.firstFormGroup.controls.selectedGroupCtrl.value;
                    break;
                case "Survey":
                    audience.survey = this.firstFormGroup.controls.selectedGroupCtrl.value;
                    break;
                default:
                // this is an error as we should have set something
                    console.log("error: type not set");
            }

            console.log(audience);

            this.apiService.createAudience(audience).subscribe(list =>
            {
                console.log(list);
                this.router.navigateByUrl("/audience");
            });
        }
        else {
            console.log("form not valid");
        }
    }

    loadCustomerCountBySegments() {

        var customerList: Customer[] = [];
        if (this.selectedGroup != null) {
            if(this.selectedGroup.eligibilities == null || this.selectedGroup.eligibilities.length == 0)
            {
              console.log("No eligibility set - is this a mistake?");

                // get all customers
                // TODO: will need to qualify this one they can select unused audiences
                this.apiService.getCustomers(true).subscribe(cList =>
                    {
                        //customerList = cList;
                        this.customersAvailable = cList.length;
                        this.dataSource.data = cList;
                        console.log(cList);
                    }
                );
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
                  this.dataSource.data = cList;
                  console.log(cList);
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
        this.dataSource.paginator = this.paginator;

        this.firstFormGroup.controls.selectedGroupTypeCtrl.valueChanges.subscribe(val => {
            const formattedMessage = `selectedGroupTypeCtrl is ${val}.`;
        });

        this.firstFormGroup.controls.selectedGroupCtrl.valueChanges.subscribe(val => {
            //console.log(val);
            this.selectedGroup = val as Survey | Feature | Experiment | Control | null;
        });
    }

}