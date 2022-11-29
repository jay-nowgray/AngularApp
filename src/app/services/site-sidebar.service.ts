import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Config } from 'src/app/utility/config';
 
@Injectable({
  providedIn: 'root'
})
export class SiteSidebarService {

  constructor(private http: HttpClient, private config: Config) { }


  getWorkingFor(): Observable<any> {
    const url =
      this.config.APIUrl + "Daybook/GetWorkingFor?Login_Key=" + this.config.login_Key;
    return this.http.post(url, this.config.httpOptions).pipe(catchError(this.config.handleError));
  } 
  
 
  
  GetAll(): Observable<any> {
    this.config.resolveLogin_KeyPromise();
   const url =
     this.config.APIUrl + "MenuList/GetAll?Login_Key=" + this.config.login_Key;
   return this.http
     .post(url, this.config.httpOptions)
     .pipe(catchError(this.config.handleError));
 } 
}
