import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "./customer";
import {AppSetting} from "./app-settings";
import {Paging} from "./paging";
import {Statistics} from "./statistics";
import {Experiment} from "./experiment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getAllCustomers(): Observable<Customer[]> {
    var r = this.http.get<Customer[]>("/api/customers",
        AppSetting.httpOptions);
    return r;
  }

  getExperiments(): Observable<Experiment[]> {
    var r = this.http.get<Experiment[]>("/api/experiments",
        AppSetting.httpOptions);
    return r;
  }

  getAllCustomersPage(): Observable<Paging> {
    var r = this.http.get<Paging>("/api/customersPage?pageNumber=0&pageSize=5&sortBy=id",
        AppSetting.httpOptions);
    return r;
  }

  getStatistics(): Observable<Statistics> {
    var r = this.http.get<Statistics>("/api/statistics",
        AppSetting.httpOptions);
    return r;
  }
}
