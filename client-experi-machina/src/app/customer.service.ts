import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "./customer";
import {AppSetting} from "./app-settings";
import {Paging} from "./paging";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getAllCustomers(): Observable<Customer[]> {
    var r = this.http.get<Customer[]>("/api/customers",
      AppSetting.httpOptions);
    return r;
  }

  getAllCustomersPage(): Observable<Paging> {
    var r = this.http.get<Paging>("/api/customersPage?pageNumber=0&pageSize=5&sortBy=id",
      AppSetting.httpOptions);
    return r;
  }
}
