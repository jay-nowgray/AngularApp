import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap, map } from "rxjs/operators";
import { Config } from 'src/app/utility/config';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  constructor(private http: HttpClient, private config: Config) { }
  
  getAllUserWorkingAssociation(): Observable<any> {
    this.config.resolveLogin_KeyPromise();
    const url = 
      this.config.APIUrl + "UserWorkingAssociation/GetAll?Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  GetUserWorkingAssociationById(id): Observable<any> {
    const url = this.config.APIUrl + "UserWorkingAssociation/GetByLookupId?ID=" + id +"&Login_Key=" + this.config.login_Key;
    return this.http
    .post(url, this.config.httpOptions)
    .pipe(catchError(this.config.handleError));
  }
  GetByType(type): Observable<any> {
    this.config.resolveLogin_KeyPromise();
    const url = this.config.APIUrl + "Lookup/GetByLookupType?Lookup_Type=" + type;
    return this.http.get(url, this.config.httpOptions).pipe(catchError(this.config.handleError));
  }
  saveUserWorkingAssociation(data): Observable<any> {
 this.config.resolveLogin_KeyPromise();
    const url =
      this.config.APIUrl + "UserWorkingAssociation/SaveUpdate?Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, data, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
 DeleteUserWorkingAssociationById(id): Observable<any> {
    const url = this.config.APIUrl + "UserWorkingAssociation/DeleteById?id=" + id +"&Login_Key=" + this.config.login_Key;
    return this.http
    .post(url, this.config.httpOptions)
    .pipe(catchError(this.config.handleError));
  }
  getAllEmployees(): Observable<any> {
    this.config.resolveLogin_KeyPromise();
    const url =
      this.config.APIUrl + "user/GetAll?Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  EditEmployees(data): Observable<any> {
    const url =
      this.config.APIUrl +
      "Employee/SaveUpdate?Login_Key=" + this.config.login_Key;
    //console.log("URL " + url);
    return this.http
    .post(url,data, this.config.httpOptions)
    .pipe(catchError(this.config.handleError));
  }
  GetEmployeeById(Id): Observable<any> {
    const url = this.config.APIUrl + "Employee/GetById/" + Id +"?Login_Key=" + this.config.login_Key;
    return this.http
    .post(url, this.config.httpOptions)
    .pipe(catchError(this.config.handleError));
  }

 DeleteEmployeeById(Id): Observable<any> {
    const url = this.config.APIUrl + "Employee/delete/" + Id +"?Login_Key=" + this.config.login_Key;
    return this.http
    .post(url, this.config.httpOptions)
    .pipe(catchError(this.config.handleError));
  }
  getAllEmployeesList(): Observable<any> {
    const url =
      this.config.APIUrl + "User/GetUserAllEmployee?Login_Key=" + this.config.login_Key;
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
}
