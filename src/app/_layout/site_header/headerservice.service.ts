import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Config } from 'src/app/utility/config';

@Injectable({
  providedIn: 'root'
})
export class HeaderserviceService {
  constructor(
    private config: Config,
    private http: HttpClient
  ) { }
  GetprofileById(Id): Observable<any> {
    const url = this.config.APIUrl + "User/GetProfile/"+Id + "?Login_Key=" + this.config.login_Key;
    return this.http
      .get(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
}