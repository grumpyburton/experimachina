import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

export class AppSetting {

  constructor(private http: HttpClient, private router: Router) {

  }

  public static httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS, PUT',
      'Access-Control-Allow-Headers':' Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
    })
  }
}
