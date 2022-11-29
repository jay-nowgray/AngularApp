import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Config } from 'src/app/utility/config';
import { ClientsService } from '../clients.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-clients',
  templateUrl: './edit-clients.component.html',
  styleUrls: ['./edit-clients.component.scss']
})
export class EditClientsComponent implements OnInit {
  EditForm: any;
  ClientId: any;
  clientsType: any;
  clientInfo:any;
  resultAttachmentInfo: any;
  constructor( private clientsApi: ClientsService,
    private router: Router,
     private config: Config,
     private route: ActivatedRoute,
     private expensesFormBuilder: FormBuilder) { 

    // this.ClientId = parseInt(this.route.snapshot.paramMap.get("id"));
       this.EditForm = this.expensesFormBuilder.group({
         client_Id: 0,
         company_Id:0,
         user_Id: 0,
         mobileExt:"",
        name: "",
        entityName:"",
        mobile: "",
        email: "",
        description:"",
        contact_Name:"",
        address_Type:"",
        client_Type: 0,
        designation:"",
        address_Id:"",
       
       });

       this.ClientId = parseInt(this.route.snapshot.paramMap.get("Id"));
     }

  

  ngOnInit() {
  //console.log("get id", this.ClientId);
  this.editClient();
  this.getClientType();
  }


editClient() {
  //console.log(this.ClientId);
  this.ClientId = this.ClientId;
  this.clientsApi.GetClientsById(this.ClientId).subscribe(
    res => {
      //console.log(res);
      this.EditForm.patchValue({
        client_Id:res.clients.client_Id,
        company_Id: res.clients.company_Id,
        user_Id:res.clients.user_Id,
        name: res.clients.name,
        entityName: res.clients.entityName,
        mobile: res.clients.mobile,
        email: res.clients.email,
        description: res.clients.description,
        contact_Name: res.clients.contact_Name,
        address_Type: res.clients.address_Type,
        client_Type: res.clients.client_Type,
        address_Id:res.clients.address_Id,
        mobileExt:res.clients.mobileExt,
        designation:res.clients.designation
      
      });
      this.clientInfo = res.clients;
      this.resultAttachmentInfo = [];//res.result.attachments;
    },
    err => {
      throw new Error(err);
     
    }
  );
}

saveexpense() {
  this.config.startLoader();
 if(this.EditForm.value.address_Id == null){
  this.EditForm.value.address_Id = 0 
 }
 if(this.EditForm.value.user_Id == null){
  this.EditForm.value.user_Id = 0 
  this.EditForm.value.company_Id = 0
 }

 else{

 }
  this.EditForm.value.client_Id = this.ClientId;
  
  this.clientsApi.ClientAddUpdate(this.EditForm.value).subscribe(res => {
    if (res.status == "1") {
      this.config.stopLoader();
     Swal.fire("Success", res.message, "success");
  
    this.clientInfo = res.clients;
    
    } else {
      Swal.fire("Oops..", res.message, "error");
     
    }
  });
 
}

getClientType() {
  this.clientsApi.getClientType("ClientType").subscribe(
      res => {
      this.clientsType = res.lookupList;
       
      },
      err => {
        
      }
    );
  } 

close(){
  this.router.navigate(["/crm/clients/"]);
}
cancel(){
  this.EditForm.reset();
}

}
