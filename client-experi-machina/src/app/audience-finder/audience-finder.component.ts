import {AfterViewInit, Component, inject} from '@angular/core';
import {ApiService} from "../api.service";
import {Survey} from "../survey";
import {Feature} from "../feature";
import {Experiment} from "../experiment";
import {Control} from "../control";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-audience-finder',
  templateUrl: './audience-finder.component.html',
  styleUrls: ['./audience-finder.component.css']
})
export class AudienceFinderComponent implements AfterViewInit {

  apiService: ApiService = inject(ApiService);

  selectedGroupType ="";
  groupList : any[];
  selectedGroup: Survey | Feature | Experiment | Control | null;

  firstFormGroup = this._formBuilder.group({
    selectedGroupTypeCtrl: ['', Validators.required],
    selectedGroupCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required]
  });


  isEditable = true;

  constructor(private _formBuilder: FormBuilder) {


  }

  loadSelectedGroup()
  {
  }

  loadGroupTypeList()
  {
    this.selectedGroup = null;
    if(this.firstFormGroup.controls.selectedGroupTypeCtrl.value != null &&
        this.firstFormGroup.controls.selectedGroupTypeCtrl.value == "survey")
    {
      this.apiService.getSurveys(true).subscribe( list =>
          this.groupList = list);
    }
    if(this.firstFormGroup.controls.selectedGroupTypeCtrl.value != null &&
        this.firstFormGroup.controls.selectedGroupTypeCtrl.value == "control")
    {
      this.apiService.getControls(true).subscribe( list =>
          this.groupList = list);
    }
    if(this.firstFormGroup.controls.selectedGroupTypeCtrl.value != null &&
        this.firstFormGroup.controls.selectedGroupTypeCtrl.value == "experiment")
    {
      this.apiService.getExperiments(true).subscribe( list =>
          this.groupList = list);
    }
    if(this.firstFormGroup.controls.selectedGroupTypeCtrl.value != null &&
        this.firstFormGroup.controls.selectedGroupTypeCtrl.value == "feature")
    {
      this.apiService.getFeatures(true).subscribe( list =>
          this.groupList = list);
    }
  }

  ngAfterViewInit(): void {
    this.firstFormGroup.controls.selectedGroupTypeCtrl.valueChanges.subscribe(val => {
          const formattedMessage = `selectedGroupTypeCtrl is ${val}.`;
          console.log(formattedMessage);
    });

    this.firstFormGroup.controls.selectedGroupCtrl.valueChanges.subscribe(val => {
      console.log(val);
      this.selectedGroup = val as Survey | Feature | Experiment | Control | null;
    });

  }

}
