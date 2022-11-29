import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Config } from 'src/app/utility/config';
 
@Injectable({
 providedIn: 'root'
})
export class ProjectService {
 
 constructor(private http: HttpClient, private config: Config) { }
 
 getAllProjects(): Observable<any> {
  const url =
    this.config.APIUrl + "Projects/GetProjects?Login_Key=" + this.config.login_Key;
  return this.http
    .post(url, this.config.httpOptions)
    .pipe(catchError(this.config.handleError));
} 

 saveProject(data): Observable<any> {
  const url =
    this.config.APIUrl + "Projects/ProjectCreateUpdate?Login_Key=" + this.config.login_Key;
  //console.log("URL " + url);
  return this.http
    .post(url, data, this.config.httpOptions)
    .pipe(catchError(this.config.handleError));
}

GetProjectById(Id): Observable<any> {
  const url = this.config.APIUrl + "Projects/GetById?Id="+ Id+"&Login_Key=" + this.config.login_Key;
  return this.http
  .post(url, this.config.httpOptions)
  .pipe(catchError(this.config.handleError));
}
GetStatus(type): Observable<any> {
  const url = this.config.APIUrl + "Lookup/GetByLookupType?Lookup_Type=" + type;
  return this.http.get(url, this.config.httpOptions).pipe(catchError(this.config.handleError));
}
getClientList(): Observable<any> {
  const url = this.config.APIUrl + "Clients/GetAll?Login_Key=" + this.config.login_Key;
  return this.http
    .post(url, this.config.httpOptions)
    .pipe(catchError(this.config.handleError));
}

GetProjectByClientId(Client_Id): Observable<any> {
  const url = this.config.APIUrl + "Projects/GetProjectsByClientId?Client_Id="+ Client_Id +"&Login_Key=" + this.config.login_Key;
  return this.http
  .post(url, this.config.httpOptions)
  .pipe(catchError(this.config.handleError));
}
}


