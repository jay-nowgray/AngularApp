import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Config } from 'src/app/utility/config';
import Swal from 'sweetalert2';
import { MenulistService } from '../menulist.service';



@Component({
  selector: 'app-menulist',
  templateUrl: './menulist.component.html',
  styleUrls: ['./menulist.component.scss']
})
export class MenulistComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['menu_Id','menu_Name', 'url', 'is_Active','short_Order','parent_Id','action'];
  // columnsToDisplay: string[] = ['userName', 'billingRate','payRate', 'action'];
  dataSource: any;
  user_Id: number;
  submitted: boolean = false;
  // paginator: any;
  isSubmitted: boolean = false;
  ModalOpen: boolean;
  MenuForm: FormGroup;
  isShow: boolean;
  userDetails: any;
  hideForUser: boolean;
  menuMasters: MatTableDataSource<unknown>;
  mainmenu: any;
  constructor(private api: MenulistService, private LookupFormBuilder: FormBuilder, private config: Config) {
    this.MenuForm = this.LookupFormBuilder.group({

      menu_Id: 0,
      menu_Name: "",
      url: "",
      short_Order: 0,
      parent_Id: 0,
      is_Active: true,
      dts: "2021-09-08T06:06:08.474",
      icon:""
    });
  }


  ngOnInit() {
    this.Getall();
 
    this.userDetails = JSON.parse(localStorage.getItem("userObj"));
   
    if (this.userDetails.userInfo.role_Id > 1) {
      this.hideForUser = true;
    }
  }

savemenu(){
  if (this.MenuForm.value.menu_Id == null) {
    this.MenuForm.value.menu_Id = 0;
  } else {

  }
  if (this.MenuForm.value.parent_Id == null) {
    this.MenuForm.value.parent_Id = 0;
  }
  this.MenuForm.value.dts = "2020-12-23T11:36:09.105Z";

  this.api.SaveMenu(this.MenuForm.value).subscribe(res => {
    if (res.status == '1') {
      this.config.stopLoader();

      Swal.fire("Success", res.message, "success");
     
      this.ModalOpen = false;
      this.Getall();
      this.MenuForm.reset();
    }
    else {
      err => {
        
      }
    }
  });
 
}

getById(Id) {
  this.ModalOpen = true;
  this.api.GetById(Id).subscribe(
    res => {
     //console.log("res id",res)
      this.MenuForm.patchValue({
        menu_Id: res.menuMasters.menu_Id,
        menu_Name:res.menuMasters.menu_Name,
        url:res.menuMasters.url,
        short_Order:res.menuMasters.short_Order,
        parent_Id:res.menuMasters.parent_Id,
        is_Active:res.menuMasters.is_Active,
        dts:res.menuMasters.dts,
        icon:res.menuMasters.icon
      });
    },
    err => {
      throw new Error(err);
     
    }
  );
}

delete(Id)
{
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
      this.api.DeleteById(Id).subscribe(res => {
   
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
  Getall() {
    this.api.GetAll().subscribe(
      res => {
        //console.log("listedmenu", res);
        this.menuMasters=res.menuMasters;
   
        this.dataSource = new MatTableDataSource(res.menuMasters);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      err => {
        //console.log("Errror", err);
      }
    );
  }





 

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }



  cancel() {
    this.submitted = false;
    this.ModalOpen = false;
    this.MenuForm.reset();
  }
  addLookup() {
    this.ModalOpen = true;
  }



}