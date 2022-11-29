import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Config } from 'src/app/utility/config';

@Injectable({
  providedIn: 'root'
})
export class SalariesService {

  constructor(private http: HttpClient, private config: Config) { }

  Getall(IsActive): Observable<any> {
    const url = this.config.APIUrl + "User/GetEmployeeIsActive?Login_Key=" + this.config.login_Key + "&IsActive=" + IsActive; //+ "debug1";
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  getSalarieList(): Observable<any> {
    const url = this.config.APIUrl + "Salaries/GetAllSalary?Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  GetSalaryById(Id): Observable<any> {
    const url = this.config.APIUrl + "Employee/SalarySettingGetById/" + Id + "?Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  SalariesAddUpdate(data): Observable<any> {
    const url =
      this.config.APIUrl +
      "Salaries/SalarySaveUpdate?Login_Key=" + this.config.login_Key;
    //console.log("URL " + url);
    return this.http
      .post(url, data, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  GetSalariesById(Id): Observable<any> {
    const url = this.config.APIUrl + "Salaries/GetByIdSalary/" + Id + "?Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  DeleteSalary(Id): Observable<any> {
    const url = this.config.APIUrl + "Salaries/deleteSalary/" + Id + "?Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  getFilterSalary(year, month, userId): Observable<any> {
    const url = this.config.APIUrl + "Salaries/GetSalariesFilter?Login_Key=" + this.config.login_Key
      + "&year=" + year + "&month=" + month + "&userId=" + userId;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }

  GetSalaryAdjustment(id): Observable<any> {
    const url = this.config.APIUrl + "Salaries/GetSalaryAdjustment?id=" + id + "&Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }

  GetSalaryListByMonth(userId, month, year): Observable<any> {
    const url = this.config.APIUrl + "Salaries/GetSalaryListByMonth?Login_Key=" + this.config.login_Key + "&userId=" + userId + "&salaryMonth=" + month + "&salaryYear=" + year;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }

  GenerateSalary(): Observable<any> {
    const url = this.config.APIUrl + "Salaries/GenerateSalary?Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
}

