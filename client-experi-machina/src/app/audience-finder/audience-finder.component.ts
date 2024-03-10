import {Component, inject} from '@angular/core';
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
export class AudienceFinderComponent {

  apiService: ApiService = inject(ApiService);

  selectedGroupType ="";
  groupList : any[];
  selectedGroup: Survey | Feature | Experiment | Control | null;

  firstFormGroup = this._formBuilder.group({
    selectedGroupTypeCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required]
  });


  isEditable = true;

  constructor(private _formBuilder: FormBuilder) {}

  loadGroupTypeList()
  {
    this.selectedGroup = null;
    console.log("change");
    console.log(this.groupList);
    console.log(this.selectedGroupType);
    if(this.selectedGroupType != null && this.selectedGroupType == "survey")
    {
      this.apiService.getSurveys(true).subscribe( list =>
          this.groupList = list);
    }
    if(this.selectedGroupType != null && this.selectedGroupType == "control")
    {
      this.apiService.getControls(true).subscribe( list =>
          this.groupList = list);
    }
    if(this.selectedGroupType != null && this.selectedGroupType == "experiment")
    {
      this.apiService.getExperiments(true).subscribe( list =>
          this.groupList = list);
    }
    if(this.selectedGroupType != null && this.selectedGroupType == "feature")
    {
      this.apiService.getFeatures(true).subscribe( list =>
          this.groupList = list);
    }

  }

}
