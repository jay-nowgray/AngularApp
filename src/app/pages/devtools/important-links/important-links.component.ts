import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Config } from 'src/app/utility/config';
import Swal from 'sweetalert2';
import { ImportantlinksService } from '../importantlinks.service';

@Component({
  selector: 'app-important-links',
  templateUrl: './important-links.component.html',
  styleUrls: ['./important-links.component.scss']
})
export class ImportantLinksComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['name', 'url', 'email', 'createdName','remark','action'];
  // columnsToDisplay: string[] = ['userName', 'billingRate','payRate', 'action'];
  dataSource: any;
  user_Id: number;
  submitted: boolean = false;
  // paginator: any;
  isSubmitted: boolean = false;
  ModalOpen: boolean;
  importantLink: FormGroup;
  isShow: boolean;
  userDetails: any;
  hideForUser: boolean;
  constructor(private Api: ImportantlinksService, private LookupFormBuilder: FormBuilder, private config: Config) {
    this.importantLink = this.LookupFormBuilder.group({

      id: 0,
      name: "",
      url: "",
      userId: 0,
      password: "",
      remark: "",
      email: "",
      dts: "2020-12-23T11:36:09.105Z"
    });
  }


  ngOnInit() {
    this.Getall();
    this.userDetails = JSON.parse(localStorage.getItem("userObj"));
   
    if (this.userDetails.userInfo.role_Id > 1) {
      this.hideForUser = true;
    }
  }



  showpass() {
    this.isShow = !this.isShow;
  }


  saveLink() {
    if (this.importantLink.value.id == null) {
      this.importantLink.value.id = 0;
    } else {

    }
    if (this.importantLink.value.userId == null) {
      this.importantLink.value.userId = 0;
    }
    this.importantLink.value.dts = "2020-12-23T11:36:09.105Z";

    this.Api.savelink(this.importantLink.value).subscribe(res => {
      if (res.status == '1') {
        this.config.stopLoader();

        Swal.fire("Success", res.message, "success");
        //console.log("Success Res==> ", res);
        this.ModalOpen = false;
        this.Getall();
        this.importantLink.reset();
      }
      else {
        err => {
         
        }
      }
    });
  }


  Getall() {
    this.Api.GetAll().subscribe(
      res => {
        //console.log("listed", res);
        this.dataSource = new MatTableDataSource(res.importantLinkList);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      err => {
        //console.log("Errror", err);
      }
    );
  }


  getById(Id) {
    this.ModalOpen = true;
    this.Api.GetById(Id).subscribe(
      res => {
        //console.log("respond", res);
        this.importantLink.patchValue({
          id: res.importantLink.id,
          name: res.importantLink.name,
          url: res.importantLink.url,
          password: res.importantLink.password,
          remark: res.importantLink.remark,
          email: res.importantLink.email


        });
      },
      err => {
        throw new Error(err);
        //console.log("errrrr", err);
      }
    );
  }



  delete(Id) {
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
        this.Api.DeleteById(Id).subscribe(res => {
          //console.log("success", res);
          if (res.status == 1) {
            //console.log("success", res);
            Swal.fire("Success", "Deleted Successfully!", "success");
            this.Getall()
          } else {
            Swal.fire("Unathorized", res.message, "error");
            //console.log("success", res);
            this.Getall();
          }
        });
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
    this.ModalOpen = false;
    this.importantLink.reset();
  }
  addLookup() {
    this.ModalOpen = true;
  }



}