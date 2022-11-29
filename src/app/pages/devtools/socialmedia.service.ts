import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Config } from 'src/app/utility/config';

@Injectable({
  providedIn: 'root'
})
export class SocialmediaService {

  constructor(private http: HttpClient, private config: Config) { }
 
  GetAll(): Observable<any> {
   const url =
     this.config.APIUrl + "SocialMedia/GetAll?Login_Key=" + this.config.login_Key;
   return this.http
     .get(url, this.config.httpOptions)
     .pipe(catchError(this.config.handleError));
 } 
 
 SaveMedia(data): Observable<any> {
  // let obj = {
  //   socialMedia: data
  //  }
   const url = this.config.APIUrl + "SocialMedia/SaveUpdate?Login_Key=" + this.config.login_Key;
  return this.http
     .post(url, data, this.config.httpOptions)
     .pipe(catchError(this.config.handleError));
 }
 
 GetById(Id): Observable<any> {
   const url = this.config.APIUrl + "SocialMedia/GetById?Id="+ Id+"&Login_Key=" + this.config.login_Key;
   return this.http
   .get(url, this.config.httpOptions)
   .pipe(catchError(this.config.handleError));
 }
DeleteById(Id): Observable<any> { 
  const url = this.config.APIUrl + "SocialMedia/DeleteSocialMedia?id=" + Id +"&Login_Key=" + this.config.login_Key;
  return this.http
    .post(url, this.config.httpOptions)
  .pipe(catchError(this.config.handleError));
} 

} 
