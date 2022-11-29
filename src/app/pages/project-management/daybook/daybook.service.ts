import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Config } from 'src/app/utility/config';

@Injectable({
  providedIn: 'root'
})
export class DaybookService {

  constructor(
    private config: Config,
    private http: HttpClient
  ) { }

  saveUpdateDaybook(data): Observable<any> {
    this.config.resolveLogin_KeyPromise()
    const url = this.config.APIUrl + "Daybook/SaveUpdate?Login_Key=" + this.config.login_Key;
    return this.http.post(url, data, this.config.httpOptions).pipe(catchError(this.config.handleError));
  }
  saveUpdateapproved(taskId, isApproved): Observable<any> {
    this.config.resolveLogin_KeyPromise()
    const url = this.config.APIUrl + "Daybook/ApproveTask?taskId="+taskId+"&IsApproved="+isApproved+"&Login_Key="+ this.config.login_Key;
    return this.http.post(url,  this.config.httpOptions).pipe(catchError(this.config.handleError));
  }

  SaveMultiTask(data): Observable<any> {
    this.config.resolveLogin_KeyPromise()
    const url = this.config.APIUrl + "daybook/SaveUpdateMulti?Login_Key=" + this.config.login_Key;
    return this.http.post(url, data, this.config.httpOptions).pipe(catchError(this.config.handleError));
  }
//new changes
  GetAll(data): Observable<any> {
    this.config.resolveLogin_KeyPromise()
    const url = this.config.APIUrl + "daybook/GetDaybookByUserId?Login_Key=" + this.config.login_Key;
    return this.http.post(url, data, this.config.httpOptions).pipe(catchError(this.config.handleError));
  }
  // GetAll(data): Observable<any> {
  //   this.config.resolveLogin_KeyPromise()
  //   const url = this.config.APIUrl + "daybook/GetByUserId?Login_Key=" + this.config.login_Key;
  //   return this.http.post(url, data, this.config.httpOptions).pipe(catchError(this.config.handleError));
  // }

  getDaybookById(id): Observable<any> {
    this.config.resolveLogin_KeyPromise()
    const url = this.config.APIUrl + "Daybook/GetTaskById?Id=" + id + "&Login_Key=" + this.config.login_Key;
    return this.http.get(url, this.config.httpOptions).pipe(catchError(this.config.handleError));
  }

  deleteDaybook(id): Observable<any> {
    this.config.resolveLogin_KeyPromise()
    const url = this.config.APIUrl + "Daybook/" + id;
    return this.http.delete(url, this.config.httpOptions).pipe(catchError(this.config.handleError));
  }

  saveClient(data): Observable<any> {
    this.config.resolveLogin_KeyPromise()
    const url = this.config.APIUrl + "Clients/ClientSaveUpdate?Login_Key=" + this.config.login_Key;
    return this.http.post(url, data, this.config.httpOptions).pipe(catchError(this.config.handleError));
  }
  saveUpdateClientcheckbox(data): Observable<any> {
    this.config.resolveLogin_KeyPromise()
    const url = this.config.APIUrl + "Clients/ClientCheckBoxSaveUpdate?Login_Key=" + this.config.login_Key;
    return this.http.post(url, data, this.config.httpOptions).pipe(catchError(this.config.handleError));
  }
  GetInvoice(taskId): Observable<any> {
    this.config.resolveLogin_KeyPromise()
    const url = this.config.APIUrl + "Reports/GetInvoiceByTaskId?Login_Key=" + this.config.login_Key + "&TaskId=" + taskId;
    return this.http.get(url, this.config.httpOptions).pipe(catchError(this.config.handleError));
  }
  

  getAllProjects(): Observable<any> {
    const url =
      this.config.APIUrl + "Projects/GetProjects?Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  } 
  GetProjectById(Id): Observable<any> {
    const url = this.config.APIUrl + "Projects/GetById?Id="+ Id+"&Login_Key=" + this.config.login_Key;
    return this.http
    .post(url, this.config.httpOptions)
    .pipe(catchError(this.config.handleError));
  }
  GetClientsById(Id): Observable<any> {
    const url = this.config.APIUrl + "Clients/GetById/" + Id +"?Login_Key=" + this.config.login_Key;
    return this.http
    .post(url, this.config.httpOptions)
    .pipe(catchError(this.config.handleError));
  }
  
  SaveUpdateTaskComment(data): Observable<any> {
    const url = this.config.APIUrl + "Daybook/SaveUpdateTaskComment?Login_Key=" + this.config.login_Key;
    return this.http.post(url, data, this.config.httpOptions).pipe(catchError(this.config.handleError));
  }

  GetCommentsByTaskId(id): Observable<any> {
    const url = this.config.APIUrl + "Daybook/GetCommentsByTaskId?Task_Id=" + id + "&Login_Key=" + this.config.login_Key;
    return this.http.get(url, this.config.httpOptions).pipe(catchError(this.config.handleError));
  }

  


}
