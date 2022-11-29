import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';


import Swal from 'sweetalert2';

import { EmpoyeeexpenseserviceService } from '../../empoyeeexpenseservice.service';
import { Config } from 'src/app/utility/config';
@Component({
  selector: 'app-employee-transaction',
  templateUrl: './employee-transaction.component.html',
  styleUrls: ['./employee-transaction.component.scss']
})
export class EmployeeTransactionComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = ['employee_Name', 'amount', 'transactionDate', 'remark', 'action'];
  digitalSign: any;
  submitted: boolean;
  clients: any;
  selectedUserName: any;
  selectedUserId: any;
  dataSource: MatTableDataSource<unknown>;
  expenseId: number;
  employeeTransactionForm: FormGroup;
  transactionId: number;
  user: any;
  EmployeeModel: boolean;

  constructor(
    private ExpensesApi: EmpoyeeexpenseserviceService,
    private config: Config,
    private employeeTransactionFormBuilder: FormBuilder,
    private route: ActivatedRoute,
    
    
  ) {
    this.transactionId = parseInt(this.route.snapshot.paramMap.get("id"));
    this.employeeTransactionForm = this.employeeTransactionFormBuilder.group({
      company_Id: 0,
      transactionId: 0,
      userId: 0,
      amount: 0,
      remark: "",
      transactionDate: "2020-10-13T07:36:16.286Z",
      dts: "2020-10-13T07:36:16.286Z",
      createdBy: 0
    });
    
  }


  ngOnInit() {
    this.Getall();
    this.Getallemployee();
  }

  Getallemployee() {
    this.ExpensesApi.Getall().subscribe(
      res => {
        this.user = res.user;
      },
      err => {
        //console.log("Errror", err);
      }
    );
  }

  Getall() {
    this.config.startLoader();
    this.ExpensesApi
      .GetallEmployeeTransaction()
      .subscribe(res => {
        if ((res.status == 1)) {
          this.config.stopLoader();
          this.dataSource = new MatTableDataSource(res.employeeTransactionList);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        } else {
          this.config.stopLoader();
        }
      });
  }
  cancel() {
    this.submitted = false;
    this.employeeTransactionForm.reset();
    this.EmployeeModel = false;
  }
  AddEmployeeTransation() {
    this.transactionId = 0;
    this.EmployeeModel = true;
    this.employeeTransactionForm.reset();
  }

  saveEmployeeTransaction() {
    if (this.employeeTransactionForm.value.transactionId == null) {
      this.employeeTransactionForm.value.transactionId = 0;
    }
    if (this.employeeTransactionForm.value.amount == null) {
      this.employeeTransactionForm.value.amount = 0;
    }
    if (this.employeeTransactionForm.value.userId == null) {
      this.employeeTransactionForm.value.userId = 0;
    } else {
      this.employeeTransactionForm.value.userId = parseInt(this.employeeTransactionForm.value.userId);
    }
    if (this.employeeTransactionForm.value.company_Id == null) {
      this.employeeTransactionForm.value.company_Id = 0;
    }
    if (this.employeeTransactionForm.value.transactionDate == null) {
      this.employeeTransactionForm.value.transactionDate = this.config.getCurrentDate();
    }
    if (this.employeeTransactionForm.value.dts == null) {
      this.employeeTransactionForm.value.dts = this.config.getCurrentDate();
    }
    this.ExpensesApi.EmployeeTransactionAddUpdate(this.employeeTransactionForm.value).subscribe(res => {
      if (res.status == 1) {
        this.EmployeeModel = false;
   
          Swal.fire("Success", res.message, "success");
       
        this.employeeTransactionForm.reset();
        this.Getall();
      } else {
        // this.toastr.error(res.message, "",
        //   {
        //     timeOut: 4000,
        //     closeButton: true,
        //     enableHtml: true,
        //     positionClass: "toast-top-right",
        //     toastClass: "alert alert-error alert-with-icon",
        //   });
      }
    });
    this.transactionId = 0;
  }

  async LoadEmployeeTransation(transactionId) {
    this.EmployeeModel = true;
    this.transactionId = transactionId;
    this.ExpensesApi.EmployeeTransactionGetByID(this.transactionId).subscribe(
      res => {
        this.employeeTransactionForm.patchValue({
          transactionId: res.employeeTransaction.transactionId,
          company_Id: res.employeeTransaction.company_Id,
          userId: res.employeeTransaction.userId,
          amount: res.employeeTransaction.amount,
          remark: res.employeeTransaction.remark,
          transactionDate: res.employeeTransaction.transactionDate,
          dts: res.employeeTransaction.dts,
          createdBy: res.employeeTransaction.createdBy,
        });
      },
      err => {
        throw new Error(err);
      }
    );
  }

  selectedUser(e) {
    this.selectedUserName = e.target.options[e.target.options.selectedIndex].text;
    this.selectedUserId = e.target.value;
  }

  delete(transactionId) {
    Swal.fire({
      title: "Are you sure want to delete?",
      
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No"
    }).then(result => {
      if (result.value) {
        this.ExpensesApi.DeleteEmployeeTransaction(transactionId).subscribe(res => {
          if (res.status == 1) {
            this.EmployeeModel = false;
   
          Swal.fire("Success", res.message, "success");
       
        this.employeeTransactionForm.reset();
            this.Getall()
          } else {
            // this.toastr.error(res.message, "",
            //   {
            //     timeOut: 4000,
            //     closeButton: true,
            //     enableHtml: true,
            //     positionClass: "toast-top-right",
            //     toastClass: "alert alert-error alert-with-icon",
            //   });
          }
        });
      }
    });
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

}
