import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from 'src/app/utility/config';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
let login_Key = "";
@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  constructor(private http: HttpClient, private config: Config) {
    login_Key =
      JSON.parse(localStorage.getItem("userObj")) !== null
        ? JSON.parse(localStorage.getItem("userObj")).key
        : "";
  }

  GetUnbilledDetails(workingFor): Observable<any> {
    const url = this.config.APIUrl + "Reports/GetDailyReportsUnBilled?Login_Key=" + this.config.login_Key + "&WorkingFor=" + workingFor;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  } 
  GetUnbilledDetailsUsers(startDate, endDate,conversion,workingFor): Observable<any> {
    const url = this.config.APIUrl + "Reports/GetDailyReportsUnBilledUser?Login_Key=" + this.config.login_Key + "&StartDate=" + startDate +"&EndDate=" + endDate  +"&Conversion=" + conversion+ "&WorkingFor=" + workingFor;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  GetExpenseReport(fy): Observable<any> {
    const url = this.config.APIUrl + "Reports/GetExpenseReportGroupedByHeadByFY?Login_Key=" + this.config.login_Key + "&FY=" + fy;
    return this.http
      .get(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  GetFinancialYear(): Observable<any> {
    const url =
      this.config.APIUrl + "Reports/GetFinancialYear?Login_Key=" + this.config.login_Key;
    return this.http
      .get(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  } 
  GetTransactionReportGroupedByModeByFY(fY,type): Observable<any> {
    const url = this.config.APIUrl + "Reports/GetTransactionReportGroupedByModeByFY?Login_Key=" + this.config.login_Key + "&FY=" + fY + "&Type=" + type;
    return this.http
      .get(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  GetReportGroupByTypes(): Observable<any> {
    const url =
      this.config.APIUrl + "Reports/GetReportGroupByTypes?Login_Key=" + this.config.login_Key;
    return this.http
      .get(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  // GetAllEmployee(): Observable<any> {
  //   const url =
  //     this.config.APIUrl + "Attendance/GetEmployeeCheckInList?Login_Key=" + this.config.login_Key;
  //   return this.http
  //     .post(url, this.config.httpOptions)
  //     .pipe(catchError(this.config.handleError));
  // }
  GetAllEmployee(): Observable<any> {
    const url =
      this.config.APIUrl + "Attendance/GetEmployeeCheckInOutList?Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  GetEmployeePL(userId, startDate, endDate): Observable<any> {
    this.config.resolveLogin_KeyPromise();
    const url = this.config.APIUrl + "Reports/GetEmployeePL?Login_Key=" + this.config.login_Key + "&UserId=" + userId + "&startDate=" + startDate + "&endDate=" + endDate;
    return this.http.get(url, this.config.httpOptions).pipe(catchError(this.config.handleError));
  }

  GetEmployeePLByDate(): Observable<any> {
    this.config.resolveLogin_KeyPromise();
    const url = this.config.APIUrl + "Reports/GetEmployeePLByDate?Login_Key=" + this.config.login_Key;
    return this.http.get(url, this.config.httpOptions).pipe(catchError(this.config.handleError));
  }
  GetSalaryPL(userId, startDate, endDate): Observable<any> {
    this.config.resolveLogin_KeyPromise();
    const url = this.config.APIUrl + "Reports/GetSalaryPL?login_Key=" + this.config.login_Key + "&UserId=" + userId + "&startDate=" + startDate + "&endDate=" + endDate;
    return this.http
      .get(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  GetSalaryAdjustment(adjustment_Type, userId, startDate, endDate): Observable<any> {
    this.config.resolveLogin_KeyPromise();
    const url = this.config.APIUrl + "Reports/SalaryAdjustReport?Login_Key=" + this.config.login_Key + "&UserId=" + userId + "&Type=" + adjustment_Type + "&FromDate=" + startDate + "&ToDate=" + endDate;
    return this.http
      .get(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  GetClientBalanceReport(clientId): Observable<any> {
    this.config.resolveLogin_KeyPromise();
    const url = this.config.APIUrl + "Reports/GetClientBalanceReport?Login_Key=" + this.config.login_Key + "&Client_Id=" + clientId;
    return this.http.get(url, this.config.httpOptions).pipe(catchError(this.config.handleError));
  }
  GetAbsent(clientId): Observable<any> {
    this.config.resolveLogin_KeyPromise();
    const url = this.config.APIUrl + "Reports/GetClientBalanceReport?Login_Key=" + this.config.login_Key + "&Client_Id=" + clientId;
    return this.http.get(url, this.config.httpOptions).pipe(catchError(this.config.handleError));
  }
  GetNotification(): Observable<any> {
    this.config.resolveLogin_KeyPromise();
    const url = this.config.APIUrl + "Notification/Notification?Login_Key=" + this.config.login_Key;
    return this.http.get(url, this.config.httpOptions).pipe(catchError(this.config.handleError));
  }
  GetSalaryAdjustmentsByType(type, workingFor): Observable<any> {
    this.config.resolveLogin_KeyPromise();
    const url = this.config.APIUrl + "Reports/GetSalaryAdjustmentsByType?Login_Key=" + this.config.login_Key + "&Type=" + type + "&workingFor=" + workingFor;
    return this.http.get(url, this.config.httpOptions).pipe(catchError(this.config.handleError));
  }
  GetEmployeeAbsentList(UserId, Month, Year): Observable<any> {
    this.config.resolveLogin_KeyPromise();
    const url = this.config.APIUrl + "Reports/GetEmployeeAbsentList?login_Key=" + this.config.login_Key + "&User_Id=" + UserId + "&Month=" + Month + "&Year=" + Year;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  LogOutUser(userId): Observable<any> {
    this.config.resolveLogin_KeyPromise();
    const url = this.config.APIUrl + "Attendance/LogOutUser?userId="+userId +"&Login_Key="+this.config.login_Key;
    return this.http.post(url, this.config.httpOptions).pipe(catchError(this.config.handleError));
  }
  
}
