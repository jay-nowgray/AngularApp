import { Component, OnInit } from '@angular/core';
import { Config, eRoleType } from 'src/app/utility/config';

@Component({
  selector: 'app-site-sidebar-btx',
  templateUrl: './site-sidebar-btx.component.html',
  styleUrls: ['./site-sidebar-btx.component.scss']
})
export class SiteSidebarBtxComponent implements OnInit {

  fullName: string;
  adminType: number;
  url: string;
  userObj: any;
  userId: number;
  IsThiredParty: boolean;
  roleId: any;
  menuMasters: any;
  mainmenu: any=[];
  userType: any;
  constructor(private config: Config) { }

  ngOnInit() {
    this.fullName = localStorage.getItem("fullName");
    var obj = JSON.parse(localStorage.getItem("userObj"));
  this.menuMasters =obj.menus;
  this.mainmenu=this.menuMasters.filter(x => x.parent_Id === 0);
   this.mainmenu = this.mainmenu.sort((a,b) => a.short_Order - b.short_Order);
  //console.log ("menunew",this.menuMasters)
    // this.userType = obj.userInfo.role_Id;
    this.userId = obj.userInfo.user_Id;
    //console.log("jayid", this.userId)
    //console.log
    
    this.fullName = localStorage.getItem("fullName");
    this.userObj = JSON.parse(localStorage.getItem("userObj"));
    this.adminType = this.userObj.userInfo.isThirdPartyAdmin;
    this.url = '/time-dashboard/'+ this.userObj.userInfo.workingFor;
    this.userId = this.userObj.userInfo.user_Id;
    this.userType = this.userObj.userInfo.role_Id;
    this.IsThiredParty = this.userObj.userInfo.isThirdPartyAdmin;
  }
  IsSuperAdmin() {
    if (this.userType === 0 || this.userType === 1) {
      return true;
    } else {
      return false;
    }
  }
  IsSale(){
    if ( this.roleId===eRoleType.HR || this.roleId==eRoleType.Sales) {
      return true;
    } else {
      return false;
    }

}
IsHR(){
  if ( this.roleId===eRoleType.HR) {
    return true;
  } else {
    return false;
  }

}
IsThiredPartyAdmin()
{
  if ( this.IsThiredParty == false) {
    return true;
  } else {
    return false;
  }
}
getSubMenu(menu){
  // //console.log("listedmenu", this.menuMasters);
  // //console.log(menu,"menu");
let data = this.menuMasters.filter(x => x.parent_Id === menu.menu_Id);
// //console.log(data,"filter");
  return  data;
}
signOut()
{
  
}
}
