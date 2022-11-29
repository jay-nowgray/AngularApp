import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Config } from 'src/app/utility/config';
import { ClientsService } from '../clients.service';
@Component({
  selector: 'app-clients-bill',
  templateUrl: './clients-bill.component.html',
  styleUrls: ['./clients-bill.component.scss']
})
export class ClientsBillComponent implements OnInit {
  @Input() clientName: any;
  clientInfo: any;
  ClientId: any;
  multiDaybook: boolean = false;
  startDate: any;
  endDate: any;
  billInfo: any;
  debitAmount: any;
  creditAmount: any;
  totalDebitedAmount: number = 0;
  totalCreditedAmount: number = 0;
  firmInfo: any;
  client_Name: any;
  ModalOpen: boolean = false;
  userDetails: any;
  taskType: any = "";
  selectedFrequencyName: any = "";
  selectedFrequencyValue: any = 0;
  commentObj: any;
  clientCheckBoxForm = new FormGroup({
    client_Id: new FormControl(0),
    gst: new FormControl(false),
    other: new FormControl(false),
    tally: new FormControl(false),
    company: new FormControl(false),
    it: new FormControl(false),
    audit: new FormControl(false),
  });
  daybookForm = new FormGroup({
    task_Id: new FormControl(0),
    company_Id: new FormControl(0),
    project_Id: new FormControl(0),
    client_Id: new FormControl(0),
    taskName: new FormControl(""),
    isCompleted: new FormControl(false),
    isDeleted: new FormControl(false),
    status: new FormControl(""),
    created_By: new FormControl(0),
    createdOn: new FormControl("2020-09-25T12:09:29.200Z"),
    remark: new FormControl(""),
    priority: new FormControl(""),
    start_Date: new FormControl("2020-09-25T12:09:29.200Z"),
    end_Date: new FormControl("2020-09-25T12:09:29.200Z"),
    dts: new FormControl("2020-09-25T12:09:29.200Z"),
    frequencyInDays: new FormControl(0),
    occurence: new FormControl(0),
    frequencyName: new FormControl(""),
    totalAmount: new FormControl(0),
    paidAmount: new FormControl(0),
    balanceAmount: new FormControl(0),

  });
  clients: any;

  constructor(private config: Config,
    private router: Router,
    private route: ActivatedRoute, private clientsApi: ClientsService) {
    this.ClientId = parseInt(this.route.snapshot.paramMap.get("Id"));
    this.commentObj = {
      comment_Id: 0,
      task_Id: 0,
      comment: "",
      commentBy: 0,
      isDeleted: false,
      dts: ""
    }
  }




  ngOnInit() {
    //console.log("get id jay", this.ClientId);
    this.userDetails = JSON.parse(localStorage.getItem("userObj"));
    this.getFirmInfo();
    this.getClientInfo();
    this.getBill();

  }

  getClientInfo() {
    this.clientsApi.GetClientsById(this.ClientId).subscribe(res => {
      if (res.status == 1) {
        this.clientInfo = res.clients;
       
      }
    });
  }

  calculateAmount() {
    //console.log("Working");
    var difference = this.daybookForm.value.totalAmount - this.daybookForm.value.paidAmount;
    this.daybookForm.patchValue({
      balanceAmount: difference
    })
  }
  getBill() {

    this.config.startLoader();
    this.debitAmount = [];
    this.creditAmount = [];
    this.totalDebitedAmount = 0;
    this.totalCreditedAmount = 0;
    this.clientsApi.GetClientPL(this.ClientId, this.config.getCurrentDateParsed(this.startDate), this.config.getCurrentDateParsed(this.endDate)).subscribe(res => {
      this.config.stopLoader();
      if (res.status == 1) {
        this.billInfo = res.clientPL;
        //console.log("billinfo", this.billInfo);
        this.debitAmount = this.billInfo.filter(x => x.plType === "Dr");
        this.creditAmount = this.billInfo.filter(x => x.plType === "Cr");
        for (let i = 0; i < this.debitAmount.length; i++) {
          this.totalDebitedAmount += this.debitAmount[i].amount;
        }
        for (let i = 0; i < this.creditAmount.length; i++) {
          this.totalCreditedAmount += this.creditAmount[i].amount;
        }
      }
      else {

      }
    });
  }

  getFirmInfo() {
    this.clientsApi.GetFirmById(1).subscribe(res => {
      if (res.status == 1) {
        this.firmInfo = res.company_Info;
      } else {
        
      }
    });
  }
  onPrint() {
    window.print();
  }


}