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

  createExperiment(experiment: Experiment): Observable<Experiment[]> {
    var r = this.http.post<Experiment[]>(`/api/experiment`, experiment,
        AppSetting.httpOptions);
    return r;
  }

  saveExperiment(experiment: Experiment): Observable<Experiment[]> {
    var r = this.http.put<Experiment[]>(`/api/experiment/` + experiment.id, experiment,
        AppSetting.httpOptions);
    return r;
  }

  deleteExperiment(experiment: Experiment): Observable<Experiment[]> {
    var r = this.http.delete<Experiment[]>(`/api/experiment/` + experiment.id,
        AppSetting.httpOptions);
    return r;
  }

  getExperiments(activeOnly: boolean): Observable<Experiment[]> {
    if (activeOnly == true) {
      console.log("active");
      var r = this.http.get<Experiment[]>("/api/experiments?activeOnly=true",
          AppSetting.httpOptions);
      return r;
    }
    else {
      console.log("all");
      var r = this.http.get<Experiment[]>("/api/experiments",
          AppSetting.httpOptions);
      return r;
    }
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
