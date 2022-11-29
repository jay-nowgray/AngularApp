import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsService } from 'src/app/pages/crm/clients/clients.service';
import { Config } from 'src/app/utility/config';
import Swal from 'sweetalert2';
import { InvoiceService } from '../invoice.service';

@Component({
  selector: 'app-editinvoice',
  templateUrl: './editinvoice.component.html',
  styleUrls: ['./editinvoice.component.scss']
})
export class EditinvoiceComponent implements OnInit {
  year: any = 0;
  month: any = -1;
  invoice: any;
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
  currency: any;
  imgUrl: any;
  imageSrc: string = "";
  imageExention: string;
  Id: string;

  constructor(private router: Router, private Route: ActivatedRoute,
    private config: Config,
    private InvoiceFormBuilder: FormBuilder,
    private api: InvoiceService,
    private clientsApi: ClientsService,
    ) { 
      this.Id= this.Route.snapshot.paramMap.get("Id");
    }

  ngOnInit() {
    this.loadtransaction();
    this.getClientList();
    this.getCurrency();
    
  }
  get finvoice() { return this.invoiceForm.controls; }
  close(){
    this.router.navigate(["/accounts/Invoicing"]);
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
  getCurrency() {
    this.api.getCurrency("invoice_currency").subscribe(
        res => {
        this.currency = res.lookupList;
          
        },
        err => {
          
        }
      );
    }
    updateInvoice(){
      
    
      this.submitted = true;
      if (this.invoiceForm.invalid) {
        //  Swal.fire("Stop", "Please fill the form to continue", "error");
       
        return;
      }
      else{
        if(this.invoiceForm.value.conversionRate==null)
        {
           this.invoiceForm.value.conversionRate=1;
        }
        this.submitted = false;
        this.invoiceForm.value.company_Id = 0;
        this.invoiceForm.value.conversionRate = parseFloat(this.invoiceForm.value.conversionRate).toFixed(2);
        this.invoiceForm.value.attachment = this.imageSrc;
        this.invoiceForm.value.client_Id = parseInt(this.invoiceForm.value.client_Id);
        this.invoiceForm.value.totalAmount = parseInt(this.invoiceForm.value.totalAmount);
        this.invoiceForm.value.subTotal = parseInt(this.invoiceForm.value.totalAmount);
      //    if (this.fileInfo != null || typeof this.fileInfo != 'undefined') {
      //      this.invoiceForm.value.attachment = this.fileInfo;
      //    }
      //    else {
      //      this.invoiceForm.value.attachment = "";
      //  }
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
            Swal.fire("Success", res.message, "success");
            this.submitted = false;
          } else {
            Swal.fire("Oops..", res.message, "error");
          }
        });
      }
  
  
  
      
    }
 loadtransaction() {
    this.api.GetInvoicesById(this.Id).subscribe(res => {
      if (res.status == "1") {
        
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

}
