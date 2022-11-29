import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { GroupedObservable } from 'rxjs';
import { ExpenseService } from 'src/app/services/expense.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ExportToCsv } from 'export-to-csv';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']

})
export class ExpensesComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = ['account_Head','date','particular','amount','paid_By', 'action'];
  columnsToDisplay: string[] = ['account_Head','date','particular','amount','paid_By', 'action'];
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
  lookupListType: any;
  dataSource: MatTableDataSource<unknown>;
  total: number;

  constructor(
    private api: ExpenseService,
    private route: ActivatedRoute,
    private router: Router,
    private expensesFormBuilder: FormBuilder
  ) {
    this.expenseId = parseInt(this.route.snapshot.paramMap.get("id"));
    this.expenseForm = this.expensesFormBuilder.group({
      company_Id: 0,
      expense_Id: 0,
      month: "string",
      date: ["", Validators.required] ,
      particular: "",
       qty:0,
       tax: 0,
      amount: ["", Validators.required],
      Line_Total: 0,
      paid_By: ["", Validators.required],
     account_Head: ["", Validators.required],
     account_Head_Id: 0,
      type: ["", Validators.required],
      comment: "",
      attachment: "",
      paidByUserId: 0,
paidToUserId: 0,
is_Deleted: true

    });
  }

  ngOnInit() {
    this.GetDropdownAccountHead();
    this.getexpenses();
    this.Getall();
    this.GetDropdownExpenseType();
  }
  get f() {
    return this.expenseForm.controls;
  }

  getexpenses() {
    this.api.getExpenses(this.year, this.month).subscribe(res => {
      this.dataSource = new MatTableDataSource(res.expenses);
      this.dataSource.sort = this.sort;
      this.expenses = res.expenses
      this.dataSource.paginator = this.paginator;
     
    });
  }
  clearFilter() {
    this.month= -1;
    this.year=0;

   
    this.getexpenses();
    
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
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };

    const csvExporter = new ExportToCsv(options);

    csvExporter.generateCsv(this.expenses);
  }
  saveexpense() {
    this.submitted = true;
    
    if (this.expenseForm.invalid) {
      this.ModalOpen = true;
     
      return;
    }
    this.submitted = false;
     if(this.expenseForm.value.qty==null)
     {
             this.expenseForm.value.qty=0;
     }
     if(this.expenseForm.value.tax==null)
     {
             this.expenseForm.value.tax=0;
     }
     if(this.expenseForm.value.paidToUserId==null)
     {
             this.expenseForm.value.paidToUserId=0;
     }
     if(this.expenseForm.value.paidByUserId==null)
     {
             this.expenseForm.value.paidByUserId=0;
     }
     if(this.expenseForm.value.account_Head_Id==null)
     {
             this.expenseForm.value.account_Head_Id=0;
     }
     if(this.expenseForm.value.line_Total==null)
     {
             this.expenseForm.value.line_Total=0;
     }
  
     if(this.expenseForm.value.is_Deleted==null)
     {
             this.expenseForm.value.is_Deleted=true;
     }
    this.expenseForm.value.expense_Id = this.expenseForm.value.expense_Id > 0 ? this.expenseForm.value.expense_Id : 0;
    this.expenseForm.value.company_Id = this.expenseForm.value.company_Id > 0 ? this.expenseForm.value.company_Id : 0;
    this.api.expensesAddUpdate(this.expenseForm.value).subscribe(res => {
      if (res.status == "1") {
        this.ModalOpen = false;
        Swal.fire("Success", res.message, "success");
        this.getexpenses();
        this.expenseForm.reset();
        
      } else {
        Swal.fire("Oops..", res.message, "error");
       
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
    // this.total = sum;
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
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  async loadexpense(expense_Id) {
    this.ModalOpen = true;
    //console.log(expense_Id);
    this.expenseId = expense_Id;
    this.api.ExpensesGetByID(this.expenseId).subscribe(
      res => {
        
        
        this.expenseForm.patchValue({
          company_Id: res.expenses.company_Id,
          expense_Id: res.expenses.expense_Id,
          date: res.expenses.date,
          particular: res.expenses.particular,
          tax: res.expenses.tax,
          amount: res.expenses.amount,
          paid_By: res.expenses.paid_By,
          line_Total: res.expenses.line_Total,
          account_Head: res.expenses.account_Head,
          type: res.expenses.type,
          qty: res.expenses.qty,
          month: res.expenses.month,
          comment: res.expenses.comment,
          // attachment: res.expenses.attachment
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
        if (res.status == "1") {
          Swal.fire("Success", res.message, "success");
          this.getexpenses();
          //console.log("SuccessSSSS==> ", res);
        } else {
          Swal.fire("Oops..", res.message, "error");

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

      //icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No"
    }).then(result => {
      if (result.value) {

        this.api.Delete(expense_Id).subscribe(res => {

          if (res.status == "1") {

           
            Swal.fire("Success", "Deleted Successfully!", "success");
            this.getexpenses()
          } else {
            Swal.fire("Error", res.message, "error");

            this.getexpenses();
          }
        });
      }
    });
  }
  
  GetDropdownAccountHead() {
    this.api
      .DropdownList()
      .subscribe(res => {
        if (res.status == '1') {
          this.lookupList = res.lookupList;
          
        } else {
         
        }
      });
  }
  GetDropdownExpenseType() {
    this.api
      .DropdownListExpenseType()
      .subscribe(res => {
        if (res.status == '1') {
          this.lookupListType = res.lookupList;
        } else {
          
        }
      });
  }


 

  


}
