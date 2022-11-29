import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Config } from 'src/app/utility/config';

@Injectable({
  providedIn: 'root'
})
export class SalaryinfoService {

  constructor(
    private config: Config,
    private http: HttpClient
  ) { }


  getSalaryList(Id): Observable<any> {
    const url = this.config.APIUrl + "Employee/GetAllSalarySettingByUserId?Login_Key=" + this.config.login_Key + "&UserId=" + Id;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  GetByType(type): Observable<any> {
    this.config.resolveLogin_KeyPromise();
    const url = this.config.APIUrl + "Lookup/GetByLookupType?Lookup_Type=" + type;
    return this.http.get(url, this.config.httpOptions).pipe(catchError(this.config.handleError));
  }
  SalaryAddUpdate(data): Observable<any> {
    const url =
      this.config.APIUrl +
      "Employee/SaveUpdateSalarySetting?Login_Key=" + this.config.login_Key;
    //console.log("URL " + url);
    return this.http
      .post(url, data, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  GetSalaryById(Id): Observable<any> {
    const url = this.config.APIUrl + "Employee/GetSalaryDetailByUserId?UserId="+Id + "&Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  // DeleteBank(Id): Observable<any> {
  //   const url = this.config.APIUrl + "Employee/DeleteSalarySetting/" + Id + "?Login_Key=" + this.config.login_Key;
  //   return this.http
  //     .post(url, this.config.httpOptions)
  //     .pipe(catchError(this.config.handleError));
  // }
  //  GetById(Id): Observable<any> {
  //   this.config.resolveLogin_KeyPromise();
  //     const url = this.config.APIUrl +"Employee/SalarySettingGetById/"+ Id + "?Login_Key="+this.config.login_Key ;
  //   //  const url = this.config.APIUrl +"Employee/GetAllSalarySettingByUserId?Login_Key=" + this.config.login_Key + "&UserId=" + Id;
  //   return this.http
  //     .post(url, this.config.httpOptions)
  //     .pipe(catchError(this.config.handleError));
  // }
}