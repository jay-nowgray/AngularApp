import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from 'src/app/pages/accounts/invoicing/invoice.service';
import { Config } from 'src/app/utility/config';
import Swal from 'sweetalert2';
import { ClientsService } from '../clients.service';


@Component({
  selector: 'app-invoice-groupdollr',
  templateUrl: './invoice-groupdollr.component.html',
  styleUrls: ['./invoice-groupdollr.component.scss']
})
export class InvoiceGroupdollrComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  year: any = 0;
  month: any = -1;

  ClientId: any;
  startDate: any;

  endDate: any;

  clients: any;
  billInfo: any = "";
  Tasks: any;
  TotalbillInfo: number;
  invoiceForm = new FormGroup({
    company_Id: new FormControl(0),
    invoiceNumber: new FormControl("0"),
    client_Id: new FormControl(0,),
    attachment: new FormControl(""),
    currency: new FormControl(""),
    conversionRate: new FormControl(0),
    isProcessed: new FormControl(""),
    remarks: new FormControl(""),
    subTotal: new FormControl(0),
    totalAmount: new FormControl(0,),
    invoiceDate: new FormControl("2020-09-03T12:49:46.516Z",)
  });
  fileInfo: string;
  dataSource: MatTableDataSource<unknown>;
  currency: any;
  imgUrl: any;
  imageSrc: string = "";
  imageExention: string;
  invoice: any;
  clientInfo: any;
  constructor(private router: Router,
    private config: Config,
    private clientsApi: ClientsService,
    private route: ActivatedRoute,
    private api: InvoiceService,
  ) {
    this.route.queryParams.subscribe(params => {
      this.ClientId = params['ClientId'];
      this.startDate = params['startDate'];
      this.endDate = params['endDate'];
    });
  }


  ngOnInit(): void {
    this.clientsApi.GetClientPL(this.ClientId, this.startDate, this.endDate).subscribe(res => {
      //console.log("get user by ClientId", res)
      this.billInfo = res.clientPL[0];
      this.Tasks = res.clientPL;
      //console.log("bill data", this.Tasks);
      this.getSum();
     
    });
    this. getClientInfo();
    this.getinvoiceinfo();

  }

  getSum() {
    let sum = 0;
    if (this.Tasks != null) {
      for (let i = 0; i < this.Tasks.length; i++) {
        sum += this.Tasks[i].amount;
      }
      return sum;
    }

  }
  getPaid(): number {
    let sum = 0;
    for (let i = 0; i < this.Tasks; i++) {
      sum += this.Tasks[i].paidAmount;
    }
    return sum;
  }
  getClientInfo() {
    this.clientsApi.GetClientsById(this.ClientId).subscribe(res => {
      if (res.status == 1) {
        this.clientInfo = res.clients;
      }
    });
  }
  getinvoiceinfo() {
    this.clientsApi.getinvoiceinfo().subscribe(res => {
      if (res.status == 1) {
        this.invoice = res.invoice;
      }
    });
  }
  saveinvoice() {
    //console.log("get user by ClientId", this.ClientId)
    this.invoiceForm.value.client_Id = this.ClientId
    this.invoiceForm.value.invoiceDate = this.config.getCurrentDate();
    this.invoiceForm.value.totalAmount = this.getSum();
    this.invoiceForm.value.company_Id = 0;
    if (this.invoiceForm.value.conversionRate == null) {
      this.invoiceForm.value.conversionRate = 1;
    }
    if (this.invoiceForm.value.totalAmount == null) {
      this.invoiceForm.value.totalAmount = 0;
    }
    if (this.invoiceForm.value.subTotal == null) {
      this.invoiceForm.value.subTotal = 0;
    }
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

    this.invoiceForm.value.invoiceNumber = "";


    this.invoiceForm.value.isProcessed = true;

    this.api.InvoicesAddUpdate(this.invoiceForm.value).subscribe(res => {
      if (res.status == "1") {

        Swal.fire("Success", res.message, "success");
        this.invoiceForm.reset();


      } else {
        Swal.fire("Oops..", res.message, "error");
      }
    });
  }
  onPrint() {
    window.print();
  }


}
