import { Component, Input, OnInit , ViewChild} from '@angular/core';
import { from } from 'rxjs';
import {FormGroup,FormBuilder, Validators} from '@angular/forms'
import { EmployeeContactService } from '../../employee/employee-contact/employee-contact.service';
import Swal from 'sweetalert2';
import { MatTableDataSource,} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-employee-contact',
  templateUrl: './employee-contact.component.html',
  styleUrls: ['./employee-contact.component.scss']
})
export class EmployeeContactComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['address_Line1', 'address_Line2', 'city', 'state', 'action']
  @Input() user_Id: any;
contactForm: FormGroup;
  EmployeeList: any;
  ModalOpen = false;
  dataSource: MatTableDataSource<unknown>;
  submitted: boolean;
  constructor( private FormBuilder:FormBuilder, private api: EmployeeContactService) {
  this.contactForm = this.FormBuilder.group({
  company_Id: 0,
  address_Id: 0,
 address_Line1: "",
  address_Line2: "",
  city: ["", Validators.required],
  state:["", Validators.required],
  country:["", Validators.required],
  pincode:"",
  contact_No1: "",
  contact_No2: "",
  website: "",
  comment: "",
personal_Email: [''],
  user_Id: 0

});
}
  ngOnInit() {
     this.getEmployeeList();
    
  }

  addLookup(){
    this.ModalOpen = true
  }
  cancel(){
    this.ModalOpen = false;
    this.contactForm.reset();
    this.submitted=false;
  }
  getEmployeeList() {
    this.api.GetEmployeeContect(this.user_Id).subscribe(
      res => {
        //console.log("listing", res)
        this.dataSource = new MatTableDataSource(res.contactList);
        this.dataSource.sort = this.sort;
        this.EmployeeList = res.contactList;
      },
      err => {
        //console.log("Errror", err);
      }
    );
  }
  get f() {
    return this.contactForm.controls;
  }
saveContact(){
  this.submitted = true;
    //console.log(this.contactForm.value)
    if (this.contactForm.invalid) {
    
      return;
    }
    this.submitted = false;
  if(this.contactForm.value.company_Id==null){
    this.contactForm.value.company_Id=0

  }
  if(this.contactForm.value.address_Id==null){
    this.contactForm.value.address_Id=0
  }
  if( this.contactForm.value.contact_No1==null){
  this.contactForm.value.contact_No1="";
  }
  else
  {
    this.contactForm.value.contact_No1=this.contactForm.value.contact_No1.toString();
  }
  
  if( this.contactForm.value.contact_No2==null){
    this.contactForm.value.contact_No2="";
    }
    else{
      this.contactForm.value.contact_No2=this.contactForm.value.contact_No2.toString();
    }
    if( this.contactForm.value.pincode==null){
      this.contactForm.value.pincode="";
      }
      else{
        this.contactForm.value.pincode=this.contactForm.value.pincode.toString();
      }
  this.contactForm.value.user_Id = parseInt(this.user_Id);
  this.api.saveEmployeeContact(this.contactForm.value).subscribe(res => {
    if (res.status == "1") {
    Swal.fire("Success", res.message, "success");
     this.contactForm.reset();
     this.ModalOpen = false;
     this.getEmployeeList();
 
    }
    else {
      Swal.fire("Oops..", res.message, "error");
     
    }
  });
  }


  getEmployeeContact(id) {
this.ModalOpen = true;
  this.api.GetEmployeeById(id).subscribe(
      res => {
        // this.userInfo = res.user;
        //console.log("respond", res);
        this.contactForm.patchValue({
         company_Id: res.contact.company_Id,
          address_Id: res.contact.address_Id,
          address_Line1: res.contact.address_Line1,
          address_Line2: res.contact.address_Line2,
          city: res.contact.city,
          state: res.contact.state,
          country: res.contact.country,
          pincode: res.contact.pincode,
          contact_No1: res.contact.contact_No1,
          contact_No2: res.contact.contact_No2,
          website: res.contact.website,
          comment: res.contact.comment,
          personal_Email: res.contact.personal_Email,
          user_Id: res.contact.user_Id,
       
        });
      },
      err => {
        throw new Error(err);
    
      }
    );

  }


  Delete(Id) {
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
        this.api.deleteContact(Id).subscribe(res => {
          //console.log("ddddddee", res);
          if (res.status == 1) {
          
            Swal.fire("Success", "Deleted Successfully!", "success");
            this.getEmployeeList()
          } else {
            Swal.fire("Unathorized", res.message, "error");
           
            this.getEmployeeList();
          }
        });
      }
    });
  }

  

}
