import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Config } from 'src/app/utility/config';
@Injectable({
  providedIn: 'root'
})
export class BillingRateService {

  constructor(private http: HttpClient, private config: Config) { }
 
  GetAll(workingFor, IsActive): Observable<any> {
   const url =
     this.config.APIUrl + "BillingRates/GetAll?Login_Key=" + this.config.login_Key + "&workingFor=" + workingFor + "&IsActive=" + IsActive;
   return this.http
     .post(url, this.config.httpOptions)
     .pipe(catchError(this.config.handleError));
 } 
 
  saveBilling(data): Observable<any> {
   const url =
     this.config.APIUrl + "BillingRates/CreateUpdate?Login_Key=" + this.config.login_Key;
  return this.http
     .post(url, data, this.config.httpOptions)
     .pipe(catchError(this.config.handleError));
 }
 
 GetBillingById(Id): Observable<any> {
   const url = this.config.APIUrl + "BillingRates/GetById?Id="+ Id+"&Login_Key=" + this.config.login_Key;
   return this.http
   .post(url, this.config.httpOptions)
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

DeleteById(Id): Observable<any> { 
  const url = this.config.APIUrl + "BillingRates/delete/" + Id +"?Login_Key=" + this.config.login_Key;
  return this.http
    .post(url, this.config.httpOptions)
  .pipe(catchError(this.config.handleError));
} 

} 
