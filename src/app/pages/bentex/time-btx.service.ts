import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Config } from 'src/app/utility/config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TimeBtxService {

  constructor(private config: Config, private http: HttpClient) { }

  // GetDailyReports(userId): Observable<any> {
  //   const url = this.config.APIUrl + "Attendance/GetAttednaceByUser?userId="+userId+"&Login_Key=" + this.config.login_Key;

  //   return this.http
  //     .get(url, this.config.httpOptions)
  //     .pipe(catchError(this.config.handleError));
  // }

  // SaveAttendance(data): Observable<any> {
  //   const url = this.config.APIUrl + "Attendance/SaveUpdate?LoginKey=" + this.config.login_Key;
  //   return this.http
  //     .post(url, data, this.config.httpOptions)
  //     .pipe(catchError(this.config.handleError));
  // }

  // DeleteAttendance(Id): Observable<any> {
  //   const url =
  //     this.config.APIUrl +
  //     "Attendance/DeleteById?id=" + Id + "&LoginKey=" + this.config.login_Key;
  //   return this.http
  //     .post(url, this.config.httpOptions)
  //     .pipe(catchError(this.config.handleError));
  // }

  // GetAttendanceById(Id): Observable<any> {
  //   //console.log("byAttendanceservice...", Id);
  //   const url = this.config.APIUrl + "Attendance/GetAttendanceById?Login_Key=" + this.config.login_Key + "&Id=" + Id;
  //   return this.http
  //     .post(url, this.config.httpOptions)
  //     .pipe(catchError(this.config.handleError));
  // }

  GetNowgrayDailyActivity(Id, startDate, endDate): Observable<any> {
     this.config.resolveLogin_KeyPromise();
    const url = this.config.APIUrl + "Attendance/GetNowgrayDailyActivity?Login_Key=" + this.config.login_Key + "&UserId=" + Id
    + "&startDate=" + startDate+ "&endDate=" + endDate;
    return this.http
      .get(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  } 
  GetDailyActivityByUser(Id, startDate, endDate): Observable<any> {
    this.config.resolveLogin_KeyPromise();
   const url = this.config.APIUrl + "Attendance/GetDailyActivityByUser?Login_Key=" + this.config.login_Key + "&UserId=" + Id
   + "&startDate=" + startDate+ "&endDate=" + endDate;
   return this.http
     .get(url, this.config.httpOptions)
     .pipe(catchError(this.config.handleError));
 } 
  
  GetDailyActivityByDate(): Observable<any> {
  const  startDate = new Date().toISOString().slice(0,10);;
  const  endDate = new Date().toISOString().slice(0,10);;
     this.config.resolveLogin_KeyPromise();
    const url = this.config.APIUrl + "Attendance/GetDailyActivityByDate?Login_Key=" + this.config.login_Key 
    + "&startDate=" + startDate+ "&endDate=" + endDate;
    return this.http
      .get(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  GetUserByWorkingFor(): Observable<any> {
    const url = this.config.APIUrl + "User/GetUserByWorkingFor?Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
DailyReportsUnBilledByUserId(userId, startDate, endDate): Observable<any> {
  this.config.resolveLogin_KeyPromise();
    const url = this.config.APIUrl + "Reports/DailyReportsUnBilledByUserId?Login_Key=" + this.config.login_Key +'&UserId='+userId+'&startDate='+startDate+'&endDate='+endDate;
    return this.http
      .get(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  CreateInvoiceByUserIdAndPeriod(userId, startDate, endDate): Observable<any> {
  this.config.resolveLogin_KeyPromise();
    const url = this.config.APIUrl + "Reports/CreateInvoiceByUserIdAndPeriod?Login_Key=" + this.config.login_Key +'&UserId='+userId+'&startDate='+startDate+'&endDate='+endDate;
    return this.http
      .get(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  SalaryPaidByUserIdAndPeriod(userId, startDate, endDate): Observable<any> {
    this.config.resolveLogin_KeyPromise();
      const url = this.config.APIUrl + "Reports/SalaryPaidByUserIdAndPeriod?Login_Key=" + this.config.login_Key +'&UserId='+userId+'&startDate='+startDate+'&endDate='+endDate;
      return this.http
        .get(url, this.config.httpOptions)
        .pipe(catchError(this.config.handleError));
    }
}
