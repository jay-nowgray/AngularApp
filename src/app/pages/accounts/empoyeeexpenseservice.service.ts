import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Identifiers } from '@angular/compiler';
import { Config } from 'src/app/utility/config';


@Injectable({
  providedIn: 'root'
})
export class EmpoyeeexpenseserviceService {

  constructor(private http: HttpClient, private config: Config) { }
  getExpenses(): Observable<any> {
    const url = this.config.APIUrl + "EmployeeExpenses/GetExpenses?Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  expensesAddUpdate(data: any): Observable<any> {
    // this.config.resolveLogin_KeyPromise();
    const url =
      this.config.APIUrl +
      "EmployeeExpenses/ExpensesCreateUpdate?Login_Key=" +
      this.config.login_Key;
    return this.http
      .post(url, data, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  ExpensesGetByID(Id: string | number): Observable<any> {
    //console.log("fromAPi", Id);
    const url =
      this.config.APIUrl +
      "EmployeeExpenses/ExpensesGetByID?Login_Key=" +
      this.config.login_Key +
      "&Id=" +
      Id;

    +this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  upLoadBase64(
    ExpanceId: string,
    CompanyId: string,
    data: { base64image: any; fileExtention: any }
  ): Observable<any> {
    const url =
      this.config.APIUrl +
      "EmployeeExpenses/ExpensesFileUploadBase64?Login_Key=" + this.config.login_Key +
      "&Expance_Id=" +
      ExpanceId +
      "Company_Id" +
      CompanyId;

    return this.http
      .post(url, data, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  Getall(): Observable<any> {
    const url = this.config.APIUrl + "User/GetAll?Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  Delete(Id): Observable<any> {
    const url = this.config.APIUrl + "EmployeeExpenses/delete?Expense_Id=" + Id + "&Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  DropdownList(): Observable<any> {
    const url = this.config.APIUrl + "Lookup/GetList?Lookup_Type=AccountHead&Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  DropdownListExpenseType(): Observable<any> {
    const url = this.config.APIUrl + "Lookup/GetList?Lookup_Type=ExpenseType&Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  EmployeeTransactionAddUpdate(data: any): Observable<any> {
    // this.config.resolveLogin_KeyPromise();
    const url =
      this.config.APIUrl +
      "Transactions/EmployeeTransactionCreateUpdate?Login_Key=" +
      this.config.login_Key;
    return this.http
      .post(url, data, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  DeleteEmployeeTransaction(Id): Observable<any> {
    const url = this.config.APIUrl + "Transactions/deleteEmployee/" + Id + "?Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  EmployeeTransactionGetByID(id): Observable<any> {
    //console.log("fromAPi", id);
    const url =
      this.config.APIUrl +
      "Transactions/GetByIdEmployeeTransaction/" + id + "?Login_Key=" +
      this.config.login_Key;

    +this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
  GetallEmployeeTransaction(): Observable<any> {
    const url = this.config.APIUrl + "Transactions/GetEmployeeTransaction?Login_Key=" + this.config.login_Key;
    return this.http
      .post(url, this.config.httpOptions)
      .pipe(catchError(this.config.handleError));
  }
}

