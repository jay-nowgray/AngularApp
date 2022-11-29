import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Config } from "../utility/config";
import { HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class LeaveService {
  constructor(private http: HttpClient, private config: Config) {}

  postLeave(data: any): Observable<any> {
    this.config.resolveLogin_KeyPromise();
    const url =
      this.config.APIUrl +
      "Leave/SaveUpdate?Login_Key=" +
      this.config.login_Key;
    return this.http
      .post(url, data, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }

  getByList(UserId): Observable<any> {
    this.config.resolveLogin_KeyPromise();
    const url =
      this.config.APIUrl +
      "Leave/GetALlLeavesByEmployee?Login_Key=" +
      this.config.login_Key +
      "&UserId=" +
      UserId;
    return this.http
      .get(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  // bystatus
  getByListbystatus(val): Observable<any> {
    this.config.resolveLogin_KeyPromise();
    const url =
      this.config.APIUrl +
      "Leave/GetALlLeavestatus?Login_Key=" +
      this.config.login_Key +
      "&Status=" +
      val;
    return this.http
      .get(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  getAll(): Observable<any> {
    this.config.resolveLogin_KeyPromise();
    const url =
      this.config.APIUrl +
      "Leave/GetALlLeavesByall?Login_Key=" +
      this.config.login_Key;
      
    return this.http
      .get(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  getByOff(): Observable<any> {
    this.config.resolveLogin_KeyPromise();
    const url =
      this.config.APIUrl +
      "Leave/GetWhoIsOff?Login_Key=" +
      this.config.login_Key;
    return this.http
      .get(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }

  getLeavesAllowed() {
    this.config.resolveLogin_KeyPromise();
    const url =
      this.config.APIUrl +
      "Leave/GetAllLeavesAllowed?Login_Key=" +
      this.config.login_Key;
    return this.http
      .get(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }

  editLeave(Id): Observable<any>{
    const url = this.config.APIUrl + "Leave/GetById?Id=" + Id + "&Login_Key=" +
    this.config.login_Key;
    return this.http
    .post(url, this.config.httpOptions)
    .pipe(catchError(this.config.handleError));
  }
  DeleteById(Id): Observable<any> { 
    const url = this.config.APIUrl + "Leave/DeleteSocialMedia?id=" + Id +"&Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
    .pipe(catchError(this.config.handleError));
  } 
}
