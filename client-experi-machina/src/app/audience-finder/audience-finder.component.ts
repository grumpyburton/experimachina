import {Component, inject} from '@angular/core';
import {ApiService} from "../api.service";

@Component({
  selector: 'app-audience-finder',
  templateUrl: './audience-finder.component.html',
  styleUrls: ['./audience-finder.component.css']
})
export class AudienceFinderComponent {

  apiService: ApiService = inject(ApiService);

  selectedGroupType ="";
  groupList : any[];

  loadGroupTypeList()
  {
    console.log("change");
    console.log(this.groupList);
    console.log(this.selectedGroupType);
    if(this.selectedGroupType != null && this.selectedGroupType == "survey")
    {
      this.apiService.getSurveys(true).subscribe( surveys =>
          this.groupList = surveys);
    }

  }

}
