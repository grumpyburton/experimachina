import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "./customer";
import {AppSetting} from "./app-settings";
import {Paging} from "./paging";
import {Statistics} from "./statistics";
import {Experiment} from "./experiment";
import {Segment} from "./segment";
import {Survey} from "./survey";
import {Eligibility} from "./eligibility";
import {Control} from "./control";
import {Feature} from "./feature";
import {FileDetails} from "./file-details";
import {Audience} from "./audience";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }


  // ------------------
  // Audience
  // ------------------

  createAudience(audience: Audience): Observable<Audience[]> {
    var r = this.http.post<Audience[]>(`/api/audience`, audience,
        AppSetting.httpOptions);
    return r;
  }

  saveAudience(audience: Audience): Observable<Audience[]> {
    var r = this.http.put<Audience[]>(`/api/audience/` + audience.id, audience,
        AppSetting.httpOptions);
    return r;
  }

  deleteAudience(audience: Audience): Observable<Audience[]> {
    var r = this.http.delete<Audience[]>(`/api/audience/` + audience.id,
        AppSetting.httpOptions);
    return r;
  }

  getAudiences(activeOnly: boolean): Observable<Audience[]> {
    if (activeOnly == true) {
      //console.log("active");
      var r = this.http.get<Audience[]>("/api/audiences?activeOnly=true",
          AppSetting.httpOptions);
      return r;
    }
    else {
      //console.log("all");
      var r = this.http.get<Audience[]>("/api/audiences",
          AppSetting.httpOptions);
      return r;
    }
  }
  
  // ---------------------
  // Controls
  // ---------------------
  createControl(control: Control): Observable<Control[]> {
    var r = this.http.post<Control[]>(`/api/control`, control,
        AppSetting.httpOptions);
    return r;
  }

  saveControl(control: Control): Observable<Control[]> {
    var r = this.http.put<Control[]>(`/api/control/` + control.id, control,
        AppSetting.httpOptions);
    return r;
  }

  deleteControl(control: Control): Observable<Control[]> {
    var r = this.http.delete<Control[]>(`/api/control/` + control.id,
        AppSetting.httpOptions);
    return r;
  }

  getControls(activeOnly: boolean): Observable<Control[]> {
    if (activeOnly == true) {
      //console.log("active");
      var r = this.http.get<Control[]>("/api/controls?activeOnly=true",
          AppSetting.httpOptions);
      return r;
    }
    else {
      //console.log("all");
      var r = this.http.get<Control[]>("/api/controls",
          AppSetting.httpOptions);
      return r;
    }
  }
  // ---------------------
  // Customer
  // ---------------------
  createCustomer(customer: Customer): Observable<Customer[]> {
    var r = this.http.post<Customer[]>(`/api/customer`, customer,
        AppSetting.httpOptions);
    return r;
  }

  saveCustomer(customer: Customer): Observable<Customer[]> {
    var r = this.http.put<Customer[]>(`/api/customer/` + customer.id, customer,
        AppSetting.httpOptions);
    return r;
  }

  deleteCustomer(customer: Customer): Observable<Customer[]> {
    var r = this.http.delete<Customer[]>(`/api/customer/` + customer.id,
        AppSetting.httpOptions);
    return r;
  }

  getCustomers(activeOnly: boolean): Observable<Customer[]> {
    if (activeOnly == true) {
      console.log("active");
      var r = this.http.get<Customer[]>("/api/customers?activeOnly=true",
          AppSetting.httpOptions);
      return r;
    }
    else {
      console.log("all");
      var r = this.http.get<Customer[]>("/api/customers",
          AppSetting.httpOptions);
      return r;
    }
  }

  getCustomersBySegments(segs: Segment[]): Observable<Customer[]> {

    var url = "/api/customers/segments?";
    //segs.forEach(seg => url += "id=" + seg.id)
    for(var i=0; i<segs.length; i++)
    {
      if(i==0)
      {
          url += "ids=";
      }
      url += segs[i].id;
      if((i+1) < segs.length)
      {
        url += ",";
      }
    }

    console.log(url);

    var r = this.http.get<Customer[]>(url, AppSetting.httpOptions);
    //console.log(r);
    return r;
  }

  // ------------------
  // Eligibility
  // ------------------
  createEligibility(eligibility: Eligibility): Observable<Eligibility[]> {
    var r = this.http.post<Eligibility[]>(`/api/eligibility`, eligibility,
        AppSetting.httpOptions);
    return r;
  }

  saveEligibility(eligibility: Eligibility): Observable<Eligibility[]> {
    var r = this.http.put<Eligibility[]>(`/api/eligibility/` + eligibility.id, eligibility,
        AppSetting.httpOptions);
    return r;
  }

  deleteEligibility(eligibility: Eligibility): Observable<Eligibility[]> {
    var r = this.http.delete<Eligibility[]>(`/api/eligibility/` + eligibility.id,
        AppSetting.httpOptions);
    return r;
  }

  getEligibilities(activeOnly: boolean): Observable<Eligibility[]> {
    if (activeOnly == true) {
      console.log("active");
      var r = this.http.get<Eligibility[]>("/api/eligibilities?activeOnly=true",
          AppSetting.httpOptions);
      return r;
    }
    else {
      console.log("all");
      var r = this.http.get<Eligibility[]>("/api/eligibilities",
          AppSetting.httpOptions);
      return r;
    }
  }
  
  // ------------------
  // Experiment
  // ------------------

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
      //console.log("active");
      var r = this.http.get<Experiment[]>("/api/experiments?activeOnly=true",
          AppSetting.httpOptions);
      return r;
    }
    else {
      //console.log("all");
      var r = this.http.get<Experiment[]>("/api/experiments",
          AppSetting.httpOptions);
      return r;
    }
  }

  // ---------------------
  // Features
  // ---------------------
  createFeature(feature: Feature): Observable<Feature[]> {
    var r = this.http.post<Feature[]>(`/api/feature`, feature,
        AppSetting.httpOptions);
    return r;
  }

  saveFeature(feature: Feature): Observable<Feature[]> {
    var r = this.http.put<Feature[]>(`/api/feature/` + feature.id, feature,
        AppSetting.httpOptions);
    return r;
  }

  deleteFeature(feature: Feature): Observable<Feature[]> {
    var r = this.http.delete<Feature[]>(`/api/feature/` + feature.id,
        AppSetting.httpOptions);
    return r;
  }

  getFeatures(activeOnly: boolean): Observable<Feature[]> {
    if (activeOnly == true) {
      //console.log("active");
      var r = this.http.get<Feature[]>("/api/features?activeOnly=true",
          AppSetting.httpOptions);
      return r;
    }
    else {
      //console.log("all");
      var r = this.http.get<Feature[]>("/api/features",
          AppSetting.httpOptions);
      return r;
    }
  }

  // ---------------------
  // Files
  // ---------------------
  deleteFile(file: FileDetails): Observable<FileDetails[]> {
    var r = this.http.delete<FileDetails[]>(`/api/file/` + file.id,
        AppSetting.httpOptions);
    return r;
  }

  getFiles(): Observable<FileDetails[]> {
      var r = this.http.get<FileDetails[]>("/api/files",
          AppSetting.httpOptions);
      return r;
  }

  importFile(file: FileDetails): Observable<FileDetails[]> {
    var r = this.http.get<FileDetails[]>("/api/file/" + file.id + "/import",
        AppSetting.httpOptions);
    return r;
  }

  //

  getAllCustomersPage(): Observable<Paging> {
    var r = this.http.get<Paging>("/api/customersPage?pageNumber=0&pageSize=5&sortBy=id",
        AppSetting.httpOptions);
    return r;
  }

  // segments
  createSegment(segment: Segment): Observable<Segment[]> {
    var r = this.http.post<Segment[]>(`/api/segment`, segment,
        AppSetting.httpOptions);
    return r;
  }

  saveSegment(segment: Segment): Observable<Segment[]> {
    var r = this.http.put<Segment[]>(`/api/segment/` + segment.id, segment,
        AppSetting.httpOptions);
    return r;
  }

  deleteSegment(segment: Segment): Observable<Segment[]> {
    var r = this.http.delete<Segment[]>(`/api/segment/` + segment.id,
        AppSetting.httpOptions);
    return r;
  }

  getSegments(activeOnly: boolean): Observable<Segment[]> {
    if (activeOnly == true) {
      //console.log("active");
      var r = this.http.get<Segment[]>("/api/segments?activeOnly=true",
          AppSetting.httpOptions);
      return r;
    }
    else {
      //console.log("all");
      var r = this.http.get<Segment[]>("/api/segments",
          AppSetting.httpOptions);
      return r;
    }
  }
  
  // surveys
  createSurvey(survey: Survey): Observable<Survey[]> {
    var r = this.http.post<Survey[]>(`/api/survey`, survey,
        AppSetting.httpOptions);
    return r;
  }

  saveSurvey(survey: Survey): Observable<Survey[]> {
    var r = this.http.put<Survey[]>(`/api/survey/` + survey.id, survey,
        AppSetting.httpOptions);
    return r;
  }

  deleteSurvey(survey: Survey): Observable<Survey[]> {
    var r = this.http.delete<Survey[]>(`/api/survey/` + survey.id,
        AppSetting.httpOptions);
    return r;
  }

  getSurveys(activeOnly: boolean): Observable<Survey[]> {
    if (activeOnly == true) {
      //console.log("active");
      var r = this.http.get<Survey[]>("/api/surveys?activeOnly=true",
          AppSetting.httpOptions);
      return r;
    }
    else {
      //console.log("all");
      var r = this.http.get<Survey[]>("/api/surveys",
          AppSetting.httpOptions);
      return r;
    }
  }
  
  // stats
  getStatistics(): Observable<Statistics> {
    var r = this.http.get<Statistics>("/api/statistics",
        AppSetting.httpOptions);
    return r;
  }
}
