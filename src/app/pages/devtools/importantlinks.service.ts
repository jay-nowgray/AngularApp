import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Config } from 'src/app/utility/config';

@Injectable({
  providedIn: 'root'
})
export class ImportantlinksService {

  constructor(private http: HttpClient, private config: Config) { }
 
  GetAll(): Observable<any> {
   const url =
     this.config.APIUrl + "ImportantLinks/GetAll?Login_Key=" + this.config.login_Key;
   return this.http
     .get(url, this.config.httpOptions)
     .pipe(catchError(this.config.handleError));
 } 
 
 savelink(data): Observable<any> {
  let obj = {
    importantLinks: data
   }
   const url = this.config.APIUrl + "ImportantLinks/SaveUpdate?Login_Key=" + this.config.login_Key;
  return this.http
     .post(url, obj, this.config.httpOptions)
     .pipe(catchError(this.config.handleError));
 }
 
 GetById(Id): Observable<any> {
   const url = this.config.APIUrl + "ImportantLinks/GetById?Id="+ Id+"&Login_Key=" + this.config.login_Key;
   return this.http
   .get(url, this.config.httpOptions)
   .pipe(catchError(this.config.handleError));
 }
DeleteById(Id): Observable<any> { 
  const url = this.config.APIUrl + "ImportantLinks/DeleteLink?id=" + Id +"&Login_Key=" + this.config.login_Key;
  return this.http
    .post(url, this.config.httpOptions)
  .pipe(catchError(this.config.handleError));
} 

} 
