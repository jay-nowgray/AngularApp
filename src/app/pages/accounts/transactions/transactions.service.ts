import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from 'src/app/utility/config';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  DropdownList() {
    throw new Error("Method not implemented.");
  }

 //export class TransactionService {

    constructor(private http: HttpClient, private config: Config) { }
     getTransactionList(): Observable<any> {
       const url = this.config.APIUrl + "Transactions/GetTransaction?Login_Key=" + this.config.login_Key;
       return this.http
         .post(url, this.config.httpOptions)
         .pipe(catchError(this.config.handleError));
     }
     transactionAddUpdate(data): Observable<any> {
       const url =
         this.config.APIUrl +
         "Transactions/TransactionCreateUpdate?Login_Key=" + this.config.login_Key;
       //console.log("URL " + url);
       return this.http
       .post(url,data, this.config.httpOptions)
       .pipe(catchError(this.config.handleError));
     }
     GetTransactionsById(Id): Observable<any> {
       const url = this.config.APIUrl + "Transactions/GetById/" + Id +"?Login_Key=" + this.config.login_Key;
       return this.http
       .post(url, this.config.httpOptions)
       .pipe(catchError(this.config.handleError));
     }
     Delete(Id): Observable<any> {
       const url = this.config.APIUrl + "Transactions/delete/" + Id +"?Login_Key=" + this.config.login_Key;
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
    getClientList(): Observable<any> {
      const url = this.config.APIUrl + "Clients/GetAll?Login_Key=" + this.config.login_Key;
      return this.http
        .post(url, this.config.httpOptions)
        .pipe(catchError(this.config.handleError));
    }
    GetallUser(): Observable<any> {
      const url = this.config.APIUrl + "User/GetAll?Login_Key=" + this.config.login_Key; //+ "debug1";
      return this.http
        .post(url, this.config.httpOptions)
        .pipe(catchError(this.config.handleError));
    }
    getFilterTransaction(year, month, clientId): Observable<any> {
      const url = this.config.APIUrl + "Transactions/GetTransactionFilter?Login_Key="+ this.config.login_Key
                                            +"&year="+ year +"&month="+ month + "&clientId=" +clientId;
      return this.http
        .post(url, this.config.httpOptions)
        .pipe(catchError(this.config.handleError));
    }
   }
