import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../utility/config';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DailyReportService {
  constructor(private config: Config, private http: HttpClient) { }

  GetDailyReports(userId): Observable<any> {
    const url = this.config.APIUrl + "Attendance/GetAttednaceByUser?userId="+userId+"&Login_Key=" + this.config.login_Key;

    return this.http
      .get(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }

  SaveAttendance(data): Observable<any> {
    const url = this.config.APIUrl + "Attendance/SaveUpdate?Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, data, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }

  DeleteAttendance(Id): Observable<any> {
    const url =
      this.config.APIUrl +
      "Attendance/DeleteById?id=" + Id + "&Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }

  GetAttendanceById(Id): Observable<any> {
    //console.log("byAttendanceservice...", Id);
    const url = this.config.APIUrl + "Attendance/GetAttendanceById?Login_Key=" + this.config.login_Key + "&Id=" + Id;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  Attandance(data): Observable<any> {
    const url = this.config.APIUrl + "Attendance/SaveUpdate?Login_Key=" + this.config.login_Key;
    return this.http.post(url, data, this.config.httpOptions).pipe(catchError(this.config.handleError));
  }
  AttandanceStatus(): Observable<any> {
    const url = this.config.APIUrl + "AppAttendance/GetAttednaceStatus?Login_Key=" + this.config.login_Key;
    return this.http.get(url, this.config.httpOptions).pipe(catchError(this.config.handleError));
  }
}
