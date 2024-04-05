import {AfterViewInit, Component, inject, ViewChild} from '@angular/core';
import {CustomerService} from "../customer.service";
import {MatTableDataSource} from "@angular/material/table";
import {Customer} from "../customer";
import {MatPaginator} from "@angular/material/paginator";
import {HttpClient} from "@angular/common/http";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ApiService} from "../api.service";
import {Statistics} from "../statistics";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])]
})
export class HomeComponent{

  apiService: ApiService = inject(ApiService);
  statistics: Statistics = {
    controls: 0, customers: 0, eligibilities: 0, experiments: 0, features: 0, segments: 0, surveys: 0, audiences: 0
  };

  constructor(private http: HttpClient) {

    this.apiService.getStatistics().subscribe(statistics =>
      this.statistics = statistics);
    //console.log(paging);
  }
}
