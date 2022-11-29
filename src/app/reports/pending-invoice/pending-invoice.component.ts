import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Config } from 'src/app/utility/config';

import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, FormControl , Validators} from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material';
import { ClientsService } from 'src/app/pages/crm/clients/clients.service';
import { InvoiceService } from 'src/app/pages/accounts/invoicing/invoice.service';

@Component({
  selector: 'app-pending-invoice',
  templateUrl: './pending-invoice.component.html',
  styleUrls: ['./pending-invoice.component.scss']
})
export class PendingInvoiceComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['invoiceNumber','clientName','invoiceDate','amount','currency','isProcessed','conversionRate','action'];
  columnsToDisplay: string[] = ['invoiceNumber','clientName','invoiceDate','amount','currency','isProcessed','conversionRate','action'];
  showcreateinvoiceModal: boolean;
  year: any = 0;
  month: any = -1;
  invoice: any;
  ModalOpen: boolean;
  submitted: boolean;
  clients: any;

  invoiceForm = new FormGroup({
    company_Id: new FormControl(0),
    invoiceNumber: new FormControl("0"),
    client_Id: new FormControl(0,Validators.required),
    attachment: new FormControl(""),
    currency: new FormControl(""),
    conversionRate: new FormControl(0),
    isProcessed: new FormControl(""),
    remarks: new FormControl(""),
    subTotal: new FormControl(0),
    totalAmount: new FormControl(0,Validators.required),
    invoiceDate: new FormControl("2020-09-03T12:49:46.516Z",Validators.required)
  });
  fileInfo: string;
  dataSource: MatTableDataSource<unknown>;
  currency: any;
  imgUrl: any;
  imageSrc: string = "";
  imageExention: string;

  constructor(private router: Router,
    private config: Config,
    private InvoiceFormBuilder: FormBuilder,
    private api: InvoiceService,
    private clientsApi: ClientsService,
  ) {
  }

  ngOnInit() {
    this.getinvoice();
    this.getClientList();
    this.getCurrency()
  }

  get f() {
    return this.invoiceForm.controls;
  }
  clearFilter() {
    this.month= -1;
    this.year=0;
    this.getClientList();
    this.getinvoice();
    
  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }



  get finvoice() { return this.invoiceForm.controls; }

  cancel() {
    this.invoiceForm.reset();
    this.ModalOpen = false;
    this.submitted = false;
    this.getinvoice();
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


  getClientList() {
    this.config.startLoader();
    this.api
      .getClientList()
      .subscribe(res => {
        this.config.stopLoader();
        if ((res.status == '1')) {
          this.clients = res.clients;
          
        } else {
        }
      });
  }

  getinvoice() {
    this.api.getPendingInvoice(this.year, this.month).subscribe(res => {
      this.invoice = res.invoice;
      this.dataSource = new MatTableDataSource(res.invoice);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      //console.log("jayy",this.invoice)
      
    });
  }
  delete(number)
  {}
  getSum(): number {
    if (typeof this.invoice == 'undefined') {
      return;
    }
    let sum = 0;
    for (let i = 0; i < this.invoice.length; i++) {
      sum += this.invoice[i].amount;
    }
    return sum;
  }

  AddInvoice() {
    this.imageSrc = "";
    this.ModalOpen = true;
    this.invoiceForm.reset();
  }

  export() {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'invoice',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
    };
    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(this.invoice);
  }

  loadtransaction(val) {
    this.ModalOpen = true;
    this.api.GetInvoicesById(val).subscribe(res => {
      if (res.status == "1") {
        //console.log("InvoiceBy ID=> ", res.invoice)
         this.imgUrl = res.invoice.attachment;
        this.invoiceForm.patchValue({
          company_Id: res.invoice.company_Id,
          invoiceNumber: res.invoice.invoiceNumber,
          client_Id: res.invoice.client_Id,
         // attachment: res.invoice.attachment,
          currency: res.invoice.currency,
          conversionRate: res.invoice.conversionRate,
          isProcessed: res.invoice.isProcessed,
          remarks: res.invoice.remarks,
          subTotal: res.invoice.subTotal,
          totalAmount: res.invoice.totalAmount,
          invoiceDate: res.invoice.invoiceDate
        })
      }
      else {

      }
    })
  }

  deleteTransaction(id) {
    Swal.fire({
      title: "Are you sure want to delete?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No"
    }).then(result => {
      if (result.value) {
        this.api.DeleteInvoices(id).subscribe(res => {
          if (res.status == 1) {
            Swal.fire("Success", "Deleted Successfully!", "success");
            this.getinvoice();
          } else {
            Swal.fire("Unathorized", res.message, "error");
          }
        });
      }
    });
  }

  saveInvoice() {
   
    this.submitted = true;
    if (this.invoiceForm.invalid) {
      this.ModalOpen = true;
      //  Swal.fire("Stop", "Please fill the form to continue", "error");
    
      return;
    }
    else{
      this.submitted = false;
     
      this.invoiceForm.value.company_Id = 0;
      this.invoiceForm.value.conversionRate = parseFloat(this.invoiceForm.value.conversionRate).toFixed(2);
      this.invoiceForm.value.attachment = this.imageSrc;
      this.invoiceForm.value.client_Id = parseInt(this.invoiceForm.value.client_Id);
      this.invoiceForm.value.totalAmount = parseInt(this.invoiceForm.value.totalAmount);
      this.invoiceForm.value.subTotal = parseInt(this.invoiceForm.value.totalAmount);
   
      if (this.invoiceForm.value.conversionRate == null || typeof this.invoiceForm.value.conversionRate == 'undefined') {
        this.invoiceForm.value.conversionRate = 1;
      } else {
        this.invoiceForm.value.conversionRate = parseFloat(this.invoiceForm.value.conversionRate);
      }
      if (this.invoiceForm.value.invoiceNumber == null || typeof this.invoiceForm.value.invoiceNumber == 'undefined') {
        this.invoiceForm.value.invoiceNumber = "";
      }
      if (this.invoiceForm.value.isProcessed == null || typeof this.invoiceForm.value.isProcessed == 'undefined') {
        this.invoiceForm.value.isProcessed = false;
      }
      this.submitted = true;
     
      this.api.InvoicesAddUpdate(this.invoiceForm.value).subscribe(res => {
        if (res.status == "1") {
          this.ModalOpen = false;
          Swal.fire("Success", res.message, "success");
          this.invoiceForm.reset();
          this.submitted = false;
          this.getinvoice();
        } else {
          Swal.fire("Oops..", res.message, "error");
        }
      });
    }



    
  }

  onFileSelect(input: HTMLInputElement): void {
    function formatBytes(bytes: number): string {
      const UNITS = ['Bytes', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      const factor = 1024;
      let index = 0;
      while (bytes >= factor) {
        bytes /= factor;
        index++;
      }
      return `${parseFloat(bytes.toFixed(2))} ${UNITS[index]}`;
    }
    const file = input.files[0];
    this.fileInfo = `${file.name}`;
    
  }


  getCurrency() {
    this.api.getCurrency("invoice_currency").subscribe(
        res => {
        this.currency = res.lookupList;
          
        },
        err => {
          
        }
      );
    }

}
