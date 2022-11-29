import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Config } from 'src/app/utility/config';
import Swal from 'sweetalert2';
import { SocialmediaService } from '../socialmedia.service';


@Component({
  selector: 'app-socialmedia',
  templateUrl: './socialmedia.component.html',
  styleUrls: ['./socialmedia.component.scss']
})
export class SocialmediaComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['name', 'date', 'day', 'type', 'remark', 'action'];
  // columnsToDisplay: string[] = ['userName', 'billingRate','payRate', 'action'];
  dataSource: any;
  user_Id: number;
  submitted: boolean = false;
  // paginator: any;
  isSubmitted: boolean = false;
  ModalOpen: boolean;
  SocialMedia: FormGroup;
  userInfo: any;
  User_Id: any;
  userType: any;
  dates: any;
  constructor(private Api: SocialmediaService, private LookupFormBuilder: FormBuilder, private config: Config) {
    this.SocialMedia = this.LookupFormBuilder.group({
      id: 0,
     // user_Id: 0,
      date: "",
      day: "",
      name: "",
      type: "",
      remark: "",
     // created_By: "",
     // modified_By: "",
     // modified_On: "2021-01-02T11:10:16.690Z",
     // dts: "2020-12-23T11:36:09.105Z"
    });
  }


  ngOnInit() {
    this.userInfo = JSON.parse(localStorage.getItem("userObj"));
    this.User_Id = JSON.parse(localStorage.getItem("userObj")).userInfo.user_Id;
    this.userType = this.userInfo.role_Id;
    console.log("roleid", this.userType)
    this.Getall();

  }

  IsSuperAdmin() {
    if (this.userType === 0 || this.userType === 1) {
      return true;
    } else {
      return false;
    }
  }
  saveLink() {
    if (this.SocialMedia.value.id == null) {
      this.SocialMedia.value.id = 0;
    } else {

    }
    if (this.SocialMedia.value. user_Id == null) {
      this.SocialMedia.value. user_Id = 0;
    }
    this.SocialMedia.value.dts = "2020-12-23T11:36:09.105Z";

    this.Api.SaveMedia(this.SocialMedia.value).subscribe(res => {
      if (res.status == '1') {
        this.config.stopLoader();

        Swal.fire("Success", res.message, "success");
       
        this.ModalOpen = false;
        this.Getall();
        this.SocialMedia.reset();
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
        this.dataSource = new MatTableDataSource(res.socialMedia);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      err => {
      
      }
    );
  }


  getById(Id) {
    this.ModalOpen = true;
    this.Api.GetById(Id).subscribe(
      res => {
        this.dates=res.socialMedia;
        this.SocialMedia.patchValue({
          id: res.socialMedia.id,
          // user_Id:res.socialMedia.user_Id,
          name:res.socialMedia.name,
          type:res.socialMedia.type,
          date:res.socialMedia.date,
          remark:res.socialMedia.remark,
          // created_By:res.socialMedia.created_By,
          day:res.socialMedia.day,
        
          


        });
      },
      err => {
        throw new Error(err);
       
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
     
          if (res.status == 1) {
          
            Swal.fire("Success", "Deleted Successfully!", "success");
            this.Getall()
          } else {
            Swal.fire("Unathorized", res.message, "error");
          
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
    this.SocialMedia.reset();
  }
  addLookup() {
    this.ModalOpen = true;
  }



}