import { Component, OnInit, ViewChild } from '@angular/core';
// import { AccountService } from 'src/app/services/account.service';
import { GroupedObservable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


import { ToastrService } from 'ngx-toastr';

import { EmpoyeeexpenseserviceService } from '../empoyeeexpenseservice.service';
import { LookupsService } from 'src/app/services/lookups.service';
import { Config, eRoleType } from 'src/app/utility/config';

@Component({
  selector: 'app-employee-expenses',
  templateUrl: './employee-expenses.component.html',
  styleUrls: ['./employee-expenses.component.scss']
})
export class EmployeeExpensesComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  selectedCar: number;

  cars = [
      { id: 1, name: 'Volvo' },
      { id: 2, name: 'Saab' },
      { id: 3, name: 'Opel' },
      { id: 4, name: 'Audi' },
  ];
  displayedColumns: string[] = ['date', 'account_Head', 'amount', 'paid_By', 'is_Approved', 'action'];
  dataSource: any;
  expenseForm: FormGroup;
  imageSrc: string = "";
  imageExention: string;
  user: any;
  year: any = 0;
  month: any = -1;
  ModalOpen: boolean = false;
  expenseId: number;
  ExpensesGetByID: any;
  expenses: any;
  submitted: boolean = false;
  imgUrl: any;
  LookupType: any;
  lookupList: any;
  lookupExpense: any;
  userDisabled: boolean;
  userInfo: any;
  selectedUserName: any;
  selectedUserId: any;
  expensesTab: boolean = true;
  transactionTab: boolean = false;
  reportTab: boolean = false;
  hideForUser: boolean;
  roleId: any;
  constructor(
    private api: EmpoyeeexpenseserviceService,
    private route: ActivatedRoute,
    private config: Config,
    private expensesFormBuilder: FormBuilder,
    private CommonApi: LookupsService,
    
  
  ) {
    this.expenseId = parseInt(this.route.snapshot.paramMap.get("id"));
    this.expenseForm = this.expensesFormBuilder.group({
      expense_Id: 0,
      date: "2020-10-06T08:33:38.764Z",
      amount: 0,
      paid_By: "",
      paidByUserId: 0,
      account_Head: "",
      type: "",
      comment: "",
      is_Deleted: true,
      is_Approved: true
    });
   
  }

  ngOnInit() {
    this.userInfo = JSON.parse(localStorage.getItem("userObj"));
    
    this.GetDropdownAccountHead();
    this.getexpenses();
    this.Getall();
    this.GetDropdownExpenseType();
    if (this.userInfo.userInfo.role_Id > 1) {
      this.userDisabled = true;
    }
    if (this.userInfo.role_Id > 0) {
      this.hideForUser = true;
    }
  }

  get f() {
    return this.expenseForm.controls;
  }
  IsAdmin(){
    if ( this.roleId==eRoleType.Admin) {
      return true;
    } else {
      return false;
    }
  
  }
  currentTab(val) {
    if (val == 'expenses') {
      this.expensesTab = true;
      this.transactionTab = false;
      this.reportTab = false;
    }
    if (val == 'transaction') {
      this.transactionTab = true;
      this.expensesTab = false;
      this.reportTab = false;
    }
    if (val == 'employee-pl-date') {
      this.transactionTab = false;
      this.expensesTab = false;
      this.reportTab = true;
    }
  }

  getexpenses() {
    this.config.startLoader();
    this.api.getExpenses().subscribe(res => {
      this.config.stopLoader();
    
      this.dataSource = new MatTableDataSource(res.expenses);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    },
      err => {
       
      }
    );
  }

  export() {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Expenses',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
    };
  }

  saveExpense() {
    if (this.expenseForm.value.expense_Id == null) {
      this.expenseForm.value.expense_Id = 0;
    }
    if (this.expenseForm.value.amount == null) {
      this.expenseForm.value.amount = 0;
    }
    if (this.expenseForm.value.paidByUserId == null) {
      this.expenseForm.value.paidByUserId = 0;
    }
    if (this.expenseForm.value.account_Head == null) {
      this.expenseForm.value.account_Head = "";
    } else if (this.expenseForm.value.account_Head == 'Other') {
      if (this.expenseForm.value.comment == null || this.expenseForm.value.comment == '') {
        return;
      }
    }
    if (this.expenseForm.value.is_Approved == null) {
      this.expenseForm.value.is_Approved = false;
    }
    if (this.expenseForm.value.is_Deleted == null) {
      this.expenseForm.value.is_Deleted = false;
    }
    if (this.expenseForm.value.type== null) {
      this.expenseForm.value.type = "";
    }
    this.expenseForm.value.paidByUserId = parseInt(this.selectedUserId);
    this.expenseForm.value.paid_By = this.selectedUserName;

    //console.log(this.expenseForm.value)

    this.api.expensesAddUpdate(this.expenseForm.value).subscribe(res => {
      if (res.status == 1) {
      
        this.ModalOpen = false;
          Swal.fire("Success", res.message, "success");
        
        this.expenseForm.reset();
        this.getexpenses();
        this.expenseForm.reset();
      } else {
       
      }
    });
    this.expenseId = 0;
  }
  getSum(): number {
    if (typeof this.expenses == 'undefined') {
      return;
    }
    let sum = 0;
    for (let i = 0; i < this.expenses.length; i++) {
      sum += this.expenses[i].amount;
    }
    return sum;
  }
  cancel() {
    this.expenseForm.reset();
    this.ModalOpen = false;
    this.submitted = false;
  }
  Addexpense() {
    this.expenseId = 0;
    this.ModalOpen = true;
    this.expenseForm.reset();
  }

  selectedUser(e) {
    this.selectedUserName = e.target.options[e.target.options.selectedIndex].text;
    this.selectedUserId = e.target.value;
  }

  async loadexpense(expense_Id) {
    this.ModalOpen = true;
    //console.log(expense_Id);
    this.expenseId = expense_Id;
    this.api.ExpensesGetByID(this.expenseId).subscribe(
      res => {
        //console.log(res);
        this.selectedUserId = res.expenses.paidByUserId;
        this.selectedUserName = res.expenses.paid_By;
        this.imgUrl = res.expenses.attachment;
        this.expenseForm.patchValue({
          expense_Id: res.expenses.expense_Id,
          date: res.expenses.date,
          amount: res.expenses.amount,
          is_Approved: res.expenses.is_Approved,
          paidByUserId: res.expenses.paidByUserId,
          account_Head: res.expenses.account_Head,
          type: res.expenses.type,
          comment: res.expenses.comment,
        });
      },
      err => {
        throw new Error(err);
       
      }
    );
  }

  updateexpense() {
  
    if (this.expenseForm.invalid) {
      return;
    } else {
      this.expenseForm.value.expense_Id = this.expenseId;
      this.api.expensesAddUpdate(this.expenseForm.value).subscribe(res => {
        if (res.status == 1) {
          this.ModalOpen = false;
          Swal.fire("Success", res.message, "success");
          
          this.expenseForm.reset();
          this.getexpenses();
          //console.log("SuccessSSSS==> ", res);
        } else {
       
        }
      });
    }
  }

  logoUpload(ExpanceId, CompanyId) {
    let data = {
      base64image: this.imageSrc,
      fileExtention: this.imageExention
    };
    this.api.upLoadBase64(ExpanceId, CompanyId, data).subscribe(
      res => {
      },
      err => {
        throw new Error(err);
      }
    );
  }

  handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert("invalid format");
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
    this.imageExention = file.name.substring(
      file.name.length - 3,
      file.name.length
    );
  }

  _handleReaderLoaded(e) {
    let reader = e.target;
    this.imageSrc = reader.result;
    
  }

  Getall() {
    this.api.Getall().subscribe(
      res => {
        this.user = res.user;
      },
      err => {
       
      }
    );
  }
  delete(expense_Id) {
    Swal.fire({
      title: "Are you sure want to delete?",
    
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No"
    }).then(result => {
      if (result.value) {
        this.config.startLoader();
        this.api.Delete(expense_Id).subscribe(res => {
          this.config.startLoader();
          if (res.status == 1) {
           
            this.getexpenses()
          } else {
           
            this.getexpenses();
          }
        });
      }
    });
  }

  GetDropdownAccountHead() {
    this.CommonApi.GetByType("AccountHead").subscribe(res => {
      if (res.status == 1) {
        this.config.stopLoader();
        this.lookupList = res.lookupList;
      } else {
        
      }
    });
  }

  GetDropdownExpenseType() {
    this.CommonApi.GetByType("ExpenseType").subscribe(res => {
      if (res.status == 1) {
        this.config.stopLoader();
        this.lookupExpense = res.lookupList;

      } else {
        
      }
    });
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
