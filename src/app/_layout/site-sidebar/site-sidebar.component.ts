import { Component, OnInit } from '@angular/core';
import { Config } from 'src/app/utility/config';
import { Router } from '@angular/router';
import { SiteSidebarService } from 'src/app/services/site-sidebar.service';

@Component({
  selector: 'app-site-sidebar',
  templateUrl: './site-sidebar.component.html',
  styleUrls: ['./site-sidebar.component.scss']
})
export class SiteSidebarComponent implements OnInit {
  fullName: string;
  userType: number;
  workingFor: any;
  menuMasters: any;
  userId: any;
  userDetails: any;
  userInfo: any;
  mainmenu: any;
  selectedWork: any[];
  submenus: any[];
  Role_Id: any;
 

  constructor(private router: Router, private sidebarApi: SiteSidebarService) { }

  ngOnInit() {
    // this.Getall();
    this.fullName = localStorage.getItem("fullName");
    var obj = JSON.parse(localStorage.getItem("userObj"));
  this.menuMasters =obj.menus;
   this.mainmenu=this.menuMasters.filter(x => x.parent_Id === 0);
   this.mainmenu = this.mainmenu.sort((a,b) => a.short_Order - b.short_Order);
  //console.log ("menunew",this.mainmenu)
    this.userType = obj.userInfo.role_Id;
    this.userId = obj.userInfo.user_Id;
    //console.log("jayid", this.userId)
    //console.log
    this.getWorkingFor();
  }

  IsSuperAdmin() {
    if (this.userType === 0 || this.userType === 1) {
      return true;
    } else {
      return false;
    }
  }

  // Admin() {
  //   if (this.userType === 1) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  // IsManager() {
  //   if (this.userType === 9 || this.userType === 1 || this.userType === 0) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
  signOut() {
    localStorage.removeItem("userObj");
    localStorage.removeItem("LoginMessage");
    this.router.navigateByUrl("/");
  }

  getWorkingFor() {
    this.sidebarApi.getWorkingFor().subscribe(res => {
      if (res.status == 1) {
        this.workingFor = res.workingFor;
        //console.log("working for", this.workingFor);
      }
    })
  }

  navigateToPage(url) {
    this.router.navigateByUrl("/time-dashboard/" + url);
  }


  // Getall() {
  //   this.sidebarApi.GetAll().subscribe(
  //     res => {
  //       // //console.log("listedmenu", res);
  //       this.menuMasters = res.menuMasters;
       
  //      this.mainmenu=this.menuMasters.filter(x => x.parent_Id === 0);
  //       // //console.log("listedmenu", this.menuMasters);
  //     },
  //     err => {
  //       //console.log("Errror", err);
  //     }
  //   );
  // }

  // openSubmenu(sortNo) {
  //   this.submenus = this.menuMasters.filter(x => x.parent_Id == sortNo);
  //   //console.log( "SUBMENU",this.submenus)
  // }
 
  getSubMenu(menu){
    // //console.log("listedmenu", this.menuMasters);
    // //console.log(menu,"menu");
let data = this.menuMasters.filter(x => x.parent_Id === menu.menu_Id);
 
    return  data;
  }
}
