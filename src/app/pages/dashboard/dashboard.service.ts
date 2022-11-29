import { Injectable } from "@angular/core";

import { Observable, of, throwError } from "rxjs";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { catchError, tap, map } from "rxjs/operators";

import { BehaviorSubject } from "rxjs";
import { Config } from 'src/app/utility/config';
 


let login_Key = "";

@Injectable({
  providedIn: "root"
})
export class DashboardService {
  constructor(private http: HttpClient, private config: Config) {
    login_Key =
      JSON.parse(localStorage.getItem("userObj")) !== null
        ? JSON.parse(localStorage.getItem("userObj")).key
        : "";
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error("An error occurred:", error.error.message);
    } else {
      console.error(
        "Backend returned code ${error.status}, " + "body was: ${error.error}"
      );
    }
    return throwError("Something bad happened; please try again later.");
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  // DashboardInfo(): Observable<any> {
  //   const url = this.config.APIUrl + "Dashboard/DashboardInfo";
  //   return this.http
  //     .post(url, this.config.httpOptions)
  //     .pipe(catchError(this.config.handleError));
  // }
  // getPersonalRequests(email): Observable<any> {
  //   const url =
  //     this.config.APIUrl + "ServicesRequests/GetReport?Email_Id=" + email;
  //   return this.http
  //     .post(url, this.config.httpOptions)
  //     .pipe(catchError(this.config.handleError));
  // }

  // incidentsReportedNearMe(data): Observable<any> {

  //   //console.log("Came in service====>>");
  //   const url =
  //     this.config.APIUrl +
  //     `ServicesRequests/IncidentsReportedNearMe?lat=${data.latitude}&lng=${data.longitude}&distance=${data.distance}`;
  //   return this.http
  //     .post(url, this.config.httpOptions)
  //     .pipe(catchError(this.config.handleError));
  // }
  exceptionLog(data): Observable<any> {
    const url = this.config.APIUrl + "Dev/ExceptionLog";
    return this.http
      .post(url, data, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  // getAllOpportunitiesReport(): Observable<any> {
  //   const url = this.config.APIUrl + "Opportunities/OpportunitiesInfo?Login_Key=" + this.config.login_Key;
  //   return this.http
  //     .post(url, this.config.httpOptions)
  //     .pipe(catchError(this.config.handleError));
  // }
  
  getDashboardCallsPending(): Observable<any> {
    const url = this.config.APIUrl + "cron/DashboardCallsList?Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  getDashboardCallsCompleted(): Observable<any> {
    const url = this.config.APIUrl + "cron/DashboardCallsMadeList?Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  getDashboardinfo(): Observable<any> {
    const url = this.config.APIUrl + "Dashboard/DashboardCallsList?Login_Key=" + this.config.login_Key;
    return this.http
      .get(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  
}
