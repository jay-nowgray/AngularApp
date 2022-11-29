import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Config } from 'src/app/utility/config';

@Injectable({
  providedIn: 'root'
})
export class MenulistService {
  constructor(private http: HttpClient, private config: Config) { }
 
  GetAll(): Observable<any> {
    this.config.resolveLogin_KeyPromise();
   const url =
     this.config.APIUrl + "MenuList/GetAll?Login_Key=" + this.config.login_Key;
   return this.http
     .post(url, this.config.httpOptions)
     .pipe(catchError(this.config.handleError));
 } 

 SaveMenu(data): Observable<any> {
 
   const url = this.config.APIUrl + "MenuList/SaveUpdate?Login_Key=" + this.config.login_Key;
  return this.http
     .post(url, data, this.config.httpOptions)
     .pipe(catchError(this.config.handleError));
 }
 Savepermision(data): Observable<any> {
 
  const url = this.config.APIUrl + "MenuPermision/SaveUpdate?Login_Key=" + this.config.login_Key;
 return this.http
    .post(url, data, this.config.httpOptions)
    .pipe(catchError(this.config.handleError));
}
GetByAll(User_Id): Observable<any> {
 
  const url = this.config.APIUrl + "MenuPermision/GetAll?Login_Key=" + this.config.login_Key + "&User_Id="+User_Id;
 return this.http
    .post(url,  this.config.httpOptions)
    .pipe(catchError(this.config.handleError));
}
 GetById(Id): Observable<any> {
  const url = this.config.APIUrl + "MenuList/GetById/"+ Id+"?Login_Key=" + this.config.login_Key;
  return this.http
  .post(url, this.config.httpOptions)
  .pipe(catchError(this.config.handleError));
}
DeleteById(Id): Observable<any> { 
  const url = this.config.APIUrl + "MenuList/delete/" + Id +"?Login_Key=" + this.config.login_Key;
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
