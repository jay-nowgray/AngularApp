import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { Config } from "src/app/utility/config";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import Swal from "sweetalert2";

import { DatePipe } from '@angular/common';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LookupsService } from 'src/app/services/lookups.service';
import { EmployeeService } from "../../employee/employee.service";

@Component({
  selector: 'app-offer-letter',
  templateUrl: './offer-letter.component.html',
  styleUrls: ['./offer-letter.component.scss']
})
export class OfferLetterComponent implements OnInit {
  OfferLetterForm: FormGroup;
  id: any;
  Obj: any;
  constructor(
    private router:Router, private employeeApi:EmployeeService,
    private OfferLetterFormBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) {
    this.id = this.route.snapshot.paramMap.get("Id");
  }
   

  ngOnInit() {
    this.employeeApi.GetOfferLetterById(this.id).subscribe(res => {
     // this.Obj = res.offer_Letter;
      //console.log(res);
    });
    this.getInfo();
  }
  getInfo() {
    this.employeeApi.GetOfferLetterById(this.id).subscribe(res => {
      if (res.status == 1) {
        this.Obj = res.offer_Letter;
      }
    });
  }
 
}
