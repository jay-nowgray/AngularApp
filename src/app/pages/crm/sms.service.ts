import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
 
import { catchError } from 'rxjs/operators';
import { Config } from 'src/app/utility/config';

@Injectable({
  providedIn: 'root'
})
export class SmsService {

  constructor(
    private http: HttpClient,
    private config: Config,
  ) {
  }
  getSMSTemplate(): Observable<any> {
    //console.log(this.config.login_Key)
    const url = this.config.APIUrl + "SMSTemplates/GetList?Login_Key=" + this.config.login_Key;
    return this.http.post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  } 
  sendSMSTemplate(data): Observable<any> {
    const url = this.config.APIUrl + "SMS/SendSMS?Login_Key=" + this.config.login_Key;
    return this.http.post(url,data, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  GetAll(): Observable<any> {
    //console.log(this.config.login_Key)
    const url = this.config.APIUrl + "SMS/GetAll?Login_Key=" + this.config.login_Key;
    return this.http.post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  } 
}