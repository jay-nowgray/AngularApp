import { Component, OnInit } from '@angular/core';
import { TransactionsService } from './transactions.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Config } from 'src/app/utility/config';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ExportToCsv } from 'export-to-csv';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['invoiceNumber', 'clientName', 'transactionDate', 'amount', 'action'];
  columnsToDisplay: string[] = ['invoiceNumber', 'clientName', 'transactionDate', 'amount', 'action'];
  dataSource: any;
  transaction: any;
  ModalOpen: boolean = false;
  submitted: boolean = false;
  transactionId: any;
  EditForm: any;
  lookupListType: any;
  clients: any;
  user: any;
  year: any = 0;
  month: any = -1;
  clientId: any = 0;
  client_Id: any;
  // submitted: boolean;

  constructor(
    private api: TransactionsService,
    private router: Router,
    private config: Config,
    private route: ActivatedRoute,
    private expensesFormBuilder: FormBuilder
  ) {
    this.transactionId = parseInt(this.route.snapshot.paramMap.get("id"));
    this.EditForm = this.expensesFormBuilder.group({
      Company_Id: 0,
      category: "",
      invoiceNumber: "",
      amount: 0,
      tax_1: 0,
      tax_2: 0,
      tax_3: 0,
      transactionMode: "",
      attachment: "",
      note: "",
      transactionDate: ["", Validators.required],
      transactionId: 0,
      clientId: [null, Validators.required],
      dts: "2020-12-18T11:54:57.116Z"


    });
  }

  ngOnInit() {
    this.LoadTransactionList();
    this.GetDropdownExpenseType();
    this.getClientList();
    // this.getTransaction();
    // this.getSum();

  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  getTransaction() {
    //console.log("client id", this.EditForm.value.clientId);
    this.api.getFilterTransaction(this.year, this.month, this.clientId).subscribe(res => {
      this.dataSource = new MatTableDataSource(res.transaction);
      this.dataSource.sort = this.sort;
      this.transaction = res.transaction
      this.dataSource.paginator = this.paginator;
      
    });
  }
  getSum(): number {
    if (typeof this.transaction == 'undefined') {
      return;
    }
    let sum = 0;
    for (let i = 0; i < this.transaction.length; i++) {
      sum += this.transaction[i].amount;
    }
    return sum;
  }
  export() {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'transaction',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };

    const csvExporter = new ExportToCsv(options);

    csvExporter.generateCsv(this.transaction);
  }

  clearFilter() {
    this.month = -1;
    this.year = 0;
    this.clientId = 0;

    this.getTransaction();

  }

  LoadTransactionList() {
    this.config.startLoader();
    this.api
      .getFilterTransaction(this.year, this.month, this.clientId)
      .subscribe(res => {
        if ((res.status == '1')) {
          this.dataSource = new MatTableDataSource(res.transaction);
          this.dataSource.sort = this.sort;
          this.transaction = res.transaction
          this.dataSource.paginator = this.paginator;
          this.config.stopLoader();
        } else {
          this.config.stopLoader();
         
        }
      });
  }
  GetallUsers() {
    this.api.GetallUser().subscribe(
      res => {
        this.user = res.user;
      },
      err => {
       
      }
    );
  }
  getClientList() {
    this.config.startLoader();
    this.api
      .getClientList()
      .subscribe(res => {
        if ((res.status == '1')) {

          this.clients = res.clients;
          
          this.config.stopLoader();
        } else {
          this.config.stopLoader();
         
        }
      });
  }

  openTransactionForm() {
    this.ModalOpen = true;
  }

  savetransaction() {
   
    this.submitted = true;
    if (this.EditForm.invalid) {
      this.ModalOpen = true;
      // Swal.fire("Stop", "Please fill the form to continue", "error");
      return;
    } else {
      if (this.EditForm.value.clientId == null) {
        this.EditForm.value.clientId = 0;
      }
      if (this.EditForm.value.company_Id == null) {
        this.EditForm.value.company_Id = 0;
      }
      if (this.EditForm.value.tax_1 == null) {
        this.EditForm.value.tax_1 = 0;
      }
      if (this.EditForm.value.tax_2 == null) {
        this.EditForm.value.tax_2 = 0;
      }
      if (this.EditForm.value.tax_3 == null) {
        this.EditForm.value.tax_3 = 0;
      }
      if (this.EditForm.value.transactionId == null) {
        this.EditForm.value.transactionId = 0;
      }
      if (this.EditForm.value.amount == null) {
        this.EditForm.value.amount = 0;
      }
      this.EditForm.value.dts = "2020-12-18T11:54:57.116Z";
      this.EditForm.value.amount = parseFloat(this.EditForm.value.amount);
      this.EditForm.value.tax_1 = parseFloat(this.EditForm.value.tax_1);
      this.EditForm.value.tax_2 = parseFloat(this.EditForm.value.tax_2);
      this.EditForm.value.tax_3 = parseFloat(this.EditForm.value.tax_3);
      this.EditForm.value.clientId = parseInt(this.EditForm.value.clientId);
      //console.log("SuccessJ==> ", this.EditForm.value);
      this.api.transactionAddUpdate(this.EditForm.value).subscribe(res => {
        if (res.status == "1") {
          this.ModalOpen = false;
          Swal.fire("Success", res.message, "success");
          this.submitted = false;
          this.EditForm.reset();
          //console.log("Success Res==> ", res);
          this.getTransaction();
        } else {
          Swal.fire("Oops..", res.message, "error");
          //console.log("Failed==> ", res);
        }
      });
      this.getTransaction()
    }
  }

  cancel() {
    this.EditForm.reset();
    this.ModalOpen = false;
    this.submitted = false;
  }
  AddClient() {
    this.transactionId = 0;
    this.ModalOpen = true;
    this.EditForm.reset();
  }
  updatetransaction(transactionId) {
    this.EditForm.value.company_Id = 0;
    if (this.EditForm.invalid) {
      return;
    } else {
      this.EditForm.value.transactionId = this.transactionId;
      this.EditForm.value.amount = parseFloat(this.EditForm.value.amount);
      this.EditForm.value.tax_1 = parseFloat(this.EditForm.value.tax_1);
      this.EditForm.value.tax_2 = parseFloat(this.EditForm.value.tax_2);
      this.EditForm.value.tax_3 = parseFloat(this.EditForm.value.tax_3);
      this.EditForm.value.clientId = parseInt(this.EditForm.value.clientId);
      this.api.transactionAddUpdate(this.EditForm.value).subscribe(res => {
        if (res.status == "1") {
          Swal.fire("Success", res.message, "success");
          this.LoadTransactionList();
         

        } else {
          Swal.fire("Oops..", res.message, "error");

          
        }
      });

    }
  }
  get f() {
    return this.EditForm.controls;
  }
  async loadtransaction(transactionId) {
    this.ModalOpen = true;
   
    this.transactionId = transactionId;
    this.api.GetTransactionsById(this.transactionId).subscribe(
      res => {
       
        this.EditForm.patchValue({
          transactionId: res.transaction.transactionId,
          company_Id: res.transaction.company_Id,
          category: res.transaction.category,
          invoiceNumber: res.transaction.invoiceNumber,
          amount: res.transaction.amount,
          tax_1: res.transaction.tax_1,
          tax_2: res.transaction.tax_2,
          tax_3: res.transaction.tax_3,
          transactionMode: res.transaction.transactionMode,
          attachment: res.transaction.attachment,
          note: res.transaction.note,
          transactionDate: res.transaction.transactionDate,
          clientId: parseInt(res.transaction.clientId),
        });
      },
      err => {
        throw new Error(err);
       
      }
    );
  }
  GetDropdownExpenseType() {
    this.api
      .DropdownListExpenseType()
      .subscribe(res => {
        if (res.status == '1') {
          this.lookupListType = res.lookupList;
        //  //console.log("hellooooo", this.lookupList)
        } else {
          
        }
      });
  }
  deleteTransaction(transactionId) {
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
        this.api.Delete(transactionId).subscribe(res => {
          //console.log("ddddddee", res);
          if (res.status == 1) {
            //console.log("dddddd", res);
            Swal.fire("Success", "Deleted Successfully!", "success");
            this.getTransaction()
          } else {
            Swal.fire("Unathorized", res.message, "error");
            
            this.getTransaction();
          }
        });
      }
    });
  }
}

