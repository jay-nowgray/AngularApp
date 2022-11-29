import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import{EmployeeService} from "../employee/employee.service"
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-employee-document',
  templateUrl: './employee-document.component.html',
  styleUrls: ['./employee-document.component.scss']
})
export class EmployeeDocumentComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['name', 'city', 'send_Date','joning_Date','expire_Date', 'action']
  dataSource: any;
  submitted: boolean;
  ModalOpen: boolean;
  id: any;
  OfferLetterForm: FormGroup;
  constructor(private router:Router,private route: ActivatedRoute, private employeeApi:EmployeeService,private OfferLetterFormBuilder: FormBuilder) { 
    this.id = this.route.snapshot.paramMap.get("id");
    this.OfferLetterForm = this.OfferLetterFormBuilder.group({
      id: 0,
      created_By: "",
      created_On: "",
      modified_By: "",
      modified_On: "",
      joning_Date: ["", Validators.required],
      name: ["", Validators.required],
      address: ["", Validators.required],
      compensetion: ["", Validators.required],
      expire_Date: ["", Validators.required],
      position: ["", Validators.required],
      city: ["", Validators.required],
      state: ["", Validators.required],
      serial_Code: [0, Validators.required],
      send_Date: ["", Validators.required],
      dOB: ["", Validators.required],
      company_Name:["", Validators.required],
       });
  }
 
  ngOnInit() {
    this.getList();
    this.id;
  }
  getList() {  
    this.employeeApi.getAllOfferLetter().subscribe(
       res => {
         this.dataSource = new MatTableDataSource(res.offer_Letter);
         this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
       },
       err => {
       
       }
     );
   }
   get f() {
     debugger
    return this.OfferLetterForm.controls;
  }
   save(){
    this.submitted=true;
    if (this.OfferLetterForm.invalid) {
    
      return;
    }
    this.submitted = false;
    // else {
       this.submitted = true;
    
    if (this.OfferLetterForm.value.user_Id == null) {
      this.OfferLetterForm.value.user_Id = 0;
    }
    if (this.OfferLetterForm.value.id == null) {
      this.OfferLetterForm.value.id = 0;
    }

         this.submitted=false;
            this.employeeApi.save(this.OfferLetterForm.value).subscribe(res => {
              if (res.status == 1) {
                //console.log("raj",res);
                this.ModalOpen = false;
                //console.log("successss", res);
                Swal.fire("Success", res.message, "success");
                this.getList();
                this.OfferLetterForm.reset();
              }
              else {
                  Swal.fire("Oops..", res.message, "error");
              }
        
        });
      }
   applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  
  cancel() {
    this.submitted = false;
    this.OfferLetterForm.reset();
    this.ModalOpen = false;
  }
  add() {
    this.id = 0;
    this.ModalOpen = true;
    this.OfferLetterForm.reset();
  }
   getDetail(id) {
    this.ModalOpen = true;
    //this.getList();
    var datePipe = new DatePipe("en-US");
    this.employeeApi.GetOfferLetterById(id).subscribe(
      res => {
        this.OfferLetterForm.patchValue({
          id: res.offer_Letter.id,
    created_By: res.offer_Letter.created_By,
    created_On: res.offer_Letter.created_On,
    modified_By: res.offer_Letter.modified_By,
    modified_On: res.offer_Letter.modified_On,
    joning_Date: datePipe.transform(res.offer_Letter.joning_Date, 'yyyy-MM-dd'),
  //  res.offer_Letter.joning_Date,
    name: res.offer_Letter.name,
    address: res.offer_Letter.address,
    compensetion: res.offer_Letter.compensetion,
    expire_Date: datePipe.transform(res.offer_Letter.expire_Date, 'yyyy-MM-dd'),
    position: res.offer_Letter.position,
    city: res.offer_Letter.city,
    state: res.offer_Letter.state,
    serial_Code: res.offer_Letter.serial_Code,
    send_Date: datePipe.transform(res.offer_Letter.send_Date, 'yyyy-MM-dd'),
      dOB:datePipe.transform(res.offer_Letter.dOB, 'yyyy-MM-dd'), 
      company_Name:res.offer_Letter.company_Name,  
        });
      },
      err => {
        throw new Error(err);
    
      }
    );

  }
  
}
