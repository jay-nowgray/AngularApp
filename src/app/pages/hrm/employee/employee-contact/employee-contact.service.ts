import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Config } from 'src/app/utility/config';

@Injectable({
  providedIn: 'root'
})
export class EmployeeContactService {

  constructor(
    private config: Config,
    private http: HttpClient
  ) { }

saveEmployeeContact(data): Observable<any> {
//console.log(this.config.login_Key);
 this.config.resolveLogin_KeyPromise();
    const url =
      this.config.APIUrl + "Employee/SaveUpdateContact?Login_Key=" + this.config.login_Key;
     //console.log("URL " + url);
    return this.http
      .post(url, data, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  getAllEmployees(): Observable<any> {
    this.config.resolveLogin_KeyPromise();
    const url =
      this.config.APIUrl + "User/GetAll?Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  } 
  GetEmployeeContect(Id): Observable<any> {
    this.config.resolveLogin_KeyPromise();
    const url = this.config.APIUrl + "Employee/GetAllContByUserId?Login_Key="+ this.config.login_Key + "&UserId=" + Id;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  GetEmployeeById(Id): Observable<any> {
    this.config.resolveLogin_KeyPromise();
    const url = this.config.APIUrl + "Employee/ContactGetById/"+ Id + "?Login_Key="+ this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }

  deleteContact(Id): Observable<any> {
    this.config.resolveLogin_KeyPromise();
    const url = this.config.APIUrl + "Employee/deleteContact/"+ Id + "?Login_Key="+ this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }


}
