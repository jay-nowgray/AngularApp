 

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Config } from 'src/app/utility/config';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatusReportService {

  constructor(private http: HttpClient, private globalConfig: Config) { }

 
   getStatusInfo(Login_Key): Observable<any> {
   
    const url = this.globalConfig.APIUrl + 'StatusReports/AskForStatusReport?Login_Key=' + Login_Key;
    return this.http.post(url, this.globalConfig.httpOptions).pipe(catchError(this.globalConfig.handleError));
  }
 saveStatusInfo(data): Observable<any> {
   
    const url = this.globalConfig.APIUrl + 'StatusReports/PostStatusReport';// + this.globalConfig.login_Key;
    return this.http.post(url, data, this.globalConfig.httpOptions).pipe(catchError(this.globalConfig.handleError));
  }
}
