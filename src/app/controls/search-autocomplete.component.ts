import { FormGroup, FormBuilder } from "@angular/forms";
import { Input, Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'SearchAutocomplete',
  template: `
      <div style="position:relative"   >
        <input class="form-control" [ngClass]="cssClass" [attr.placeholder]="placeholder" (change)="filterData($event.target.value)"  (keyup)="filterData($event.target.value)" (keydown)="filterData($event.target.value)"  [(ngModel)]="searchText" maxlength="10">
        <div class="autocomplete-items" [ngClass]="{ 'hide-items': !isActive }"  (focus)="isActive=true"  >
            <ul *ngIf="filterdDatasource" (focus)="isActive=true">
                <li (focus)="isActive=true"   *ngFor="let obj of filterdDatasource"><a  (focus)="isActive=true"  (click)="itemClick(obj)"><div class='name-clm'>{{obj[filterColumn]}}</div><div class='pan-clm'>{{obj.pan}}</div><div  class='firm-clm'>{{obj.entityName}}</div></a></li>
            </ul>
          </div>
      </div>
    ` ,
  styles: [`
    .autocomplete-items {
      position: absolute;
      display: block;
      width: 350px;
      z-index: 999;
  }
  .autocomplete-items ul {
    margin: 0px;
    padding: 0px;
    list-style:none;
    border:1px solid #ddd;
     background: #fff;
    border-radius:0px 0px 3px 3px;
    max-height: 250px;
    overflow: hidden;
}
.autocomplete-items a
{
  display:block;
   cursor:pointer;
   padding: 7px 6px;
}
.autocomplete-items a:hover
{
  background: #eee;
}
.autocomplete-items.hide-items {
  display: none;
}
    
.name-clm {
  font-weight: bold;
}

.pan-clm,.firm-clm {
  font-size: 10px;
}
.autocomplete-items .ng-star-inserted:nth-child(odd)
{
  background:#eee
} 
.autocomplete-items .ng-star-inserted:nth-child(even)
{
  background:#fff;
} 
.autocomplete-items ul:hover {
  overflow-y: scroll !important;
}
.autocomplete-items ull {
  height: 250px;
  &::-webkit-scrollbar {
    background-color: transparent;
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: transparent;
  }
}
.autocomplete-items ul:hover {
  &::-webkit-scrollbar-thumb {
    background-color: #666;
    border-radius: 4px;
  }
}

`]
})
export class SearchAutocomplete {
  isActive: boolean = false;
  parts: FormGroup;
  @Input() cssClass: any;
  @Output() resetDatasource: EventEmitter<any> = new EventEmitter();
  @Output() selectedDataEvent: EventEmitter<any> = new EventEmitter();
  @Input() placeholder: any;
  @Input() route: any;
  @Input() navigateType: any;
  searchText: any;
  filterdDatasource: any;
  @Input() filterColumn: any;
  @Input() IdColumn: any;
  @Input() datasource: any;
  selectedData: any;
  @Input()
  get value(): any | null {
    return this.searchText;
  }
  set value(text: any | null) {

    this.searchText = text;
  }

  constructor(private router: Router, ) {

  }
  async filterData(query) {
    if (query == '') {
      this.isActive = false;
    }
    else {
      this.isActive = true;
    }
    this.filterdDatasource = null;
    var txt = query.toLocaleLowerCase();
    let allRecords = this.datasource;
    // //console.log(allRecords);
    if (txt) {//.includes(txt)) : null;//
      this.filterdDatasource = allRecords ? allRecords.filter(item => 
               ( item.name.search(new RegExp(txt, 'i') ) > -1 
                || (item.entityName && item.entityName.search(new RegExp(txt, 'i') ) > -1) 
                || (item.pan && item.pan.search(new RegExp(txt, 'i') ) > -1 )
                ||(item.mobile && item.mobile.search(new RegExp(txt, 'i') ) > -1 ))
      ) : null; 
      if (this.filterdDatasource && this.filterdDatasource.length > 10) {
        this.filterdDatasource.slice(10, this.filterdDatasource.length);
      }
    } else {
      this.filterdDatasource = allRecords;
    }
    if (this.navigateType == "route") {

    }
    else {
      this.searchText = txt;
      //console.log('inside-search-compenent', this.filterdDatasource);
      this.invokeEvent();
    }
  }
  invokeEvent() {
    this.resetDatasource.emit(this.filterdDatasource);
  }
  invokeEventOnClick() {
    
    this.selectedDataEvent.emit(this.selectedData);
    
  }
 
  itemClick(obj) {
    this.selectedData = obj;
    this.isActive = false;
    this.invokeEventOnClick();
    this.searchText = '';
//     if (this.navigateType == "route") {
//       this.router.navigateByUrl(this.route + obj[this.IdColumn]);
//     }
//     else {
//       this.searchText = obj[this.filterColumn];
//       let clientId= obj.client_Id;
//       this.filterdDatasource = this.filterdDatasource ? this.filterdDatasource.filter(item => 
//         ( item.client_Id == clientId)
// ) : null; 
//       //this.filterdDatasource = this.filterdDatasource ? this.filterdDatasource.filter(item => item[this.filterColumn].search(new RegExp(this.searchText, 'i')) > -1) : null;//allRecords.filter(
//       if (this.filterdDatasource && this.filterdDatasource.length > 6) {
//         this.filterdDatasource.slice(6, this.filterdDatasource.length);
//       }
//      // //console.log('inside-search-compenent', this.filterdDatasource);
//       this.invokeEventOnClick();
//     }

  }
}


  // class SearchBox {
  //   constructor(public searchText: string) {}
  // }