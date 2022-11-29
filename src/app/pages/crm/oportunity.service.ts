import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap, map } from "rxjs/operators";
import { Config } from 'src/app/utility/config';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class OportunityService {


  constructor(private http: HttpClient, private config: Config) { }
  
  getAllOpportunitiess(PageNo, query='', OpportunitiesType): Observable<any> {
    const url =
      this.config.APIUrl + "Opportunities/GetAll?Login_Key=" + this.config.login_Key + "&OpportunitiesType=" + OpportunitiesType;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  EditOpportunitiess(data): Observable<any> {
    const url =
      this.config.APIUrl +
      "Opportunities/SaveUpdate?Login_Key=" + this.config.login_Key;
    //console.log("URL " + url);
    return this.http
    .post(url,data, this.config.httpOptions)
    .pipe(catchError(this.config.handleError));
  }
  GetOpportunitiesById(Id): Observable<any> {
    const url = this.config.APIUrl + "Opportunities/GetById/" + Id +"?Login_Key=" + this.config.login_Key;
    return this.http
    .post(url, this.config.httpOptions)
    .pipe(catchError(this.config.handleError));
  }

 DeleteOpportunitiesById(Id): Observable<any> {
    const url = this.config.APIUrl + "Opportunities/delete/" + Id +"?Login_Key=" + this.config.login_Key;
    return this.http
    .post(url, this.config.httpOptions)
    .pipe(catchError(this.config.handleError));
  }

  GetOpportunitiesClient(): Observable<any> {
    const url = this.config.APIUrl + "Opportunities/GetOpportunitiesClient/?Login_Key=" + this.config.login_Key;
    return this.http
    .post(url, this.config.httpOptions)
    .pipe(catchError(this.config.handleError));
  }
  GetJobApplicants(): Observable<any> {
    const url = this.config.APIUrl + "Opportunities/GetJobApplicants/?Login_Key=" + this.config.login_Key;
    return this.http
    .post(url, this.config.httpOptions)
    .pipe(catchError(this.config.handleError));
  }
}
