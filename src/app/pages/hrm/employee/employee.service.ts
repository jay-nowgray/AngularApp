import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Config } from 'src/app/utility/config';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private config: Config,
    private http: HttpClient
  ) { }

  getAllEmployees(): Observable<any> {
    this.config.resolveLogin_KeyPromise();
    const url =
      this.config.APIUrl + "User/GetAll?Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  } 
  getAllEmployeesList(): Observable<any> {
    this.config.resolveLogin_KeyPromise();
    const url =
      this.config.APIUrl + "User/GetUserAllEmployee?Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  } 
  saveEmployees(data): Observable<any> {
    //console.log(this.config.login_Key);
 this.config.resolveLogin_KeyPromise();
    const url =
      this.config.APIUrl + "User/UserSaveUpdate?Login_Key=" + this.config.login_Key;
    //console.log("URL " + url);
    return this.http
      .post(url, data, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }

  GetByType(type): Observable<any> {
    this.config.resolveLogin_KeyPromise();
    const url = this.config.APIUrl + "Lookup/GetByLookupType?Lookup_Type=" + type;
    return this.http.get(url, this.config.httpOptions).pipe(catchError(this.config.handleError));
  }
  GetEmployeeById(Id): Observable<any> {
    this.config.resolveLogin_KeyPromise();
    const url = this.config.APIUrl + "User/GetById?Id=" + Id + "&Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  getAllEmployeesListByIsActive(IsActive): Observable<any> {
    this.config.resolveLogin_KeyPromise();
    const url =
      this.config.APIUrl + "User/GetEmployeeIsActive?Login_Key=" + this.config.login_Key + "&IsActive=" + IsActive;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  } 
  getAllOfferLetter(): Observable<any> {
    this.config.resolveLogin_KeyPromise();
    const url =
      this.config.APIUrl + "OfferLetter/GetAll?Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  } 
  save(data): Observable<any> {
 this.config.resolveLogin_KeyPromise();
    const url =
      this.config.APIUrl + "OfferLetter/SaveUpdate?Login_Key=" + this.config.login_Key;
    //console.log("URL " + url); /SaveUpdate?Login_Key=debug1
    return this.http
      .post(url, data, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  } 
  
  GetOfferLetterById(Id): Observable<any> {
    this.config.resolveLogin_KeyPromise();
    const url = this.config.APIUrl + "OfferLetter/GetById?Id=" + Id + "&Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
}
