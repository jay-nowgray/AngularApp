import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Config } from 'src/app/utility/config';
import Swal from 'sweetalert2';
import { MenulistService } from '../menulist.service';


@Component({
  selector: 'app-menu-permision',
  templateUrl: './menu-permision.component.html',
  styleUrls: ['./menu-permision.component.scss']
})
export class MenuPermisionComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['full_Name', 'email', 'action'];
  dataSource: any;
  userId: number;
  submitted: boolean = false;
  isSubmitted: boolean = false;
  ModalOpen: boolean;
  MenuForm: FormGroup;
  isShow: boolean;
  userDetails: any;
  hideForUser: boolean;
  EmployeeList: any;
  menuMasters: any;
  user: any;
  currentUserId: any;
  currentUserName: any;
  selectobjTemp: any = [];
  selectedobj: any;
  menuMastersMain: any;
  constructor(private api: MenulistService, private LookupFormBuilder: FormBuilder, private config: Config) {
  }
  ngOnInit() {
    this.getEmployeeList();
    this.Getall();
    this.userDetails = JSON.parse(localStorage.getItem("userObj"));
    this.userId = JSON.parse(localStorage.getItem(this.userDetails.userInfo.user_Id))
    if (this.userDetails.userInfo.role_Id > 1) {
      this.hideForUser = true;
    }
  }
  getEmployeeList() {

    this.api.getAllEmployeesListByIsActive(true).subscribe(
      res => {
        //console.log("listed", res);
        this.user = res.user;
        this.dataSource = new MatTableDataSource(res.user);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      err => {

      }
    );
  }
  selectobj(value, menu_Id): void {
    let menuobj = {
      menuLK_Id: 0,
      user_Id: this.currentUserId,
      menu_Id: menu_Id,
      create: true,
      read: true,
      update: true,
      delete: true,
      is_Active: true,
      dts: "2021-09-09T10:43:15.241Z"
    }
    this.selectobjTemp = this.selectobjTemp.filter(x => x.menu_Id !== menu_Id);
    if (value.target.checked == true) {
      menuobj.user_Id = this.currentUserId;
      menuobj.menu_Id = menu_Id;
      menuobj.create = true;
      menuobj.delete = true;
      menuobj.is_Active = true;
      menuobj.read = true;
      menuobj.menuLK_Id = 0;
      menuobj.dts = "2021-09-09T10:43:15.241Z";

      this.selectobjTemp.push(menuobj);
    }
    else {
      this.selectobjTemp = this.selectobjTemp.filter(x => x.menu_Id !== menu_Id);
    }
    //console.log("List==> ", this.selectobjTemp);
  }
  savemenu() {
    var data = {
      menuLK: this.selectobjTemp
    }
    //console.log("form value", data)
    this.api.Savepermision(data).subscribe(res => {
      if (res.status == '1') {
        this.config.stopLoader();
        Swal.fire("Success", res.message, "success");
        this.ModalOpen = false;
      }
      else {
        err => {

        }
      }
    });

  }

  IsChecked(menu_Id) {
    let itemList = this.selectedobj.filter(x => x.menu_Id === menu_Id);
    if (itemList.length > 0) {
      return true;
    } else {
      return false;
    }
  }


  loadEmployee(user_Id, userName) {
    this.ModalOpen = true;
    this.currentUserId = user_Id;
    this.currentUserName = userName;
    this.api.GetByAll(user_Id).subscribe(
      res => {
        let tempdata: any = [];
        res.menuLK.forEach(elm => {
          let menuobj = {
            menuLK_Id: 0,
            user_Id: 0,
            menu_Id: 0,
            create: true,
            read: true,
            update: true,
            delete: true,
            is_Active: true,
            dts: "2021-09-09T10:43:15.241Z",

          }
          menuobj.menuLK_Id = elm.menuLK_Id;
          menuobj.user_Id = elm.user_Id;
          menuobj.menu_Id = elm.menu_Id;
          menuobj.is_Active = elm.is_Active;
          menuobj.dts = elm.dts;
          menuobj.read = elm.read;
          menuobj.update = elm.update;
          menuobj.create = elm.create;
          menuobj.delete = elm.delete;
          tempdata.push(menuobj);
        });
        this.selectobjTemp = tempdata;
        this.selectedobj = tempdata;
        //console.log("loadempdta", this.selectobjTemp)
      },
      err => {
        throw new Error(err);

      }
    );
  }

  Getall() {
    this.api.GetAll().subscribe(res => {
      this.menuMasters = res.menuMasters;
      this.menuMastersMain = res.menuMasters.filter(x => x.parent_Id === 0);
   this.menuMastersMain = this.menuMastersMain.sort((a,b) => a.short_Order - b.short_Order)
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
  }
  addLookup() {
    this.ModalOpen = true;
  }
  getSubMenu(menu){
 
let data = this.menuMasters.filter(x => x.parent_Id === menu.menu_Id);
 
    return  data;
  }
}


