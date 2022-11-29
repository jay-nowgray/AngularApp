import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { SmsService } from '../sms.service';
import { Config } from 'src/app/utility/config';
@Component({
  selector: 'app-sms-panel',
  templateUrl: './sms-panel.component.html',
  styleUrls: ['./sms-panel.component.scss']
})
export class SmsPanelComponent implements OnInit {
  smsForm: FormGroup;
  AllNotifications: any;
  constructor(private fb: FormBuilder, 
    private config: Config,
    
    private messageService: SmsService,) { 

    this.smsForm = this.fb.group({
      mobileNumbers: "",
      messageText: "",
      msgType:""
    })
  }

  ngOnInit() {
    this.loadSentSMS();
  }
  loadSentSMS()
  {
    this.messageService.GetAll().subscribe(res => {
this.AllNotifications = res.notifications;

    });
  }
  sendSMS() {

     
const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
})
    Swal.fire({
      title: 'Are you sure want to send?',
      text: "You won't be able to revert this!",
    //  icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, send it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true}
      ).then((result) => {
      if (result.value) {
        let objSms = {
          mobileNumbers: this.smsForm.value.mobileNumbers.split(','),
          messageText: this.smsForm.value.messageText,
          smsRouteType: this.smsForm.value.msgType,
          login_Key: 'debug'
        };
        //console.log(this.smsForm.value);
        
        this.messageService.sendSMSTemplate(objSms).subscribe(res => {
          if (res.status == "1") {
            this.config.showSuccessMessage(res.message);
            this.loadSentSMS();
          }
          else {
            this.config.showErrorMessage(res.message);
          }
          this.smsForm.setValue({
            mobileNumbers: "",
            messageText: "",
            msgType:""
          })
        });
      }
    })
  }
}
