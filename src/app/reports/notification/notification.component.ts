import { Component, OnInit, ViewChild } from '@angular/core';

import { ExportToCsv } from 'export-to-csv';
import { ClientsService } from 'src/app/pages/crm/clients/clients.service';
import { ReportsService } from 'src/app/pages/reports/reports.service';
import { Config } from 'src/app/utility/config';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] =['name', 'to_Email', 'to_Mobile', 'subject', 'notification_Content', 'sent_On'];

  dataSource: any;
  notification: any;
  ClientList: any;
  totalFees: number;
  totalPaid: number;
  totalBalance: number;
  ModalOpen: boolean=false;
  isNotifications:any;


  constructor(
    private ReportApi: ReportsService,
    private config: Config,
    private clientApi: ClientsService
  ) { } 

  ngOnInit() {
    this.getNotification();
   
  }

  async getNotification() {
    this.config.startLoader();
    this.ReportApi.GetNotification().subscribe(res => {
      this.config.stopLoader();
      if (res.status == 1) {
        this.notification = res.notifications;
        
        this.dataSource = new MatTableDataSource(this.notification);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.getTotalAmount()
      }
      else {
      }
    });
  }
  ShowContent(notification){
    this.isNotifications = notification;
    
    this.ModalOpen=true;

  }
  cancel()
  {
    this.ModalOpen=false;
  }
    getTotalAmount() {
    this.totalFees = 0;
    this.totalPaid = 0;
    this.totalBalance = 0;
    if (typeof this.dataSource.filteredData == 'undefined') {
      return;
    }
    for (let i = 0; i < this.dataSource.filteredData.length; i++) {
      this.totalFees += this.dataSource.filteredData[i].fees;
      this.totalPaid += this.dataSource.filteredData[i].paid;
      this.totalBalance += this.dataSource.filteredData[i].balance;
    }
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
    this.getTotalAmount();
  }


  resetDatasourceHandlerClients(data) {
    // //console.log(data);
    // this.daybookForm.value.client_Id = data[0].client_Id;
    // this.client_Name = data[0].client_Name;
    // this.hideSearch=true;
  }
  
  onClientSelection(data) {
    this.getNotification()
  }
    export() {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: false,
      title: 'client balance report',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename:'Balance Report'
    };
    const csvExporter = new ExportToCsv(options);
    let final = this.notification.map(({name,entityName,mobile,fees,paid,balance}) => ({name,entityName,mobile,fees,paid,balance}))
    csvExporter.generateCsv(final);
  }

 



}

//   @ViewChild(MatSort, { static: true }) sort: MatSort;
//   @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
//   displayedColumns: string[] = ['name', 'to_Email', 'to_Mobile', 'subject', 'notification_Content', 'sent_On', 'action'];
 
//   //columnsToDisplay: string[] = ['name', 'to_Email', 'to_Mobile', 'subject', 'notification_Content', 'sent_On', 'action'];
//   dataSource: any;
//   notification: any;
//   ClientList: any;
//   totalFees: number;
//   totalPaid: number;
//   totalBalance: number;


//   constructor(
//     private ReportApi: ReportsService,
//     private config: Config,
//     private clientApi: ClientsService
//   ) { }

//   ngOnInit(): void {
//     this.getNotification();
//   }

//   // getNotification() {
//   //   this.config.startLoader();
//   //   this.ReportApi.GetNotification().subscribe(res => {
//   //     this.config.stopLoader();
//   //     if (res.status == 1) {
//   //       this.notification = res.notifications;
//   //       this.dataSource = new MatTableDataSource(this.notification);
//   //       this.dataSource.sort = this.sort;
//   //       this.dataSource.paginator = this.paginator;
//   //       this.getTotalAmount()
//   //     }
//   //     else {
//   //     }
//   //   });
//   // }
//   async getNotification() {
//     this.config.startLoader();
//     this.ReportApi.GetNotification().subscribe(res => {
      
//         if ((res.status = 1)) {
//           //this.getAllOpportunitiesMain = res.opportunities;
//           //this.getAllOpportunities = res.opportunities;
//           this.dataSource = new MatTableDataSource(res.notifications);
//           this.dataSource.sort = this.sort;
       
//           this.dataSource.paginator = this.paginator;
//           this.config.stopLoader();
//         } else {
//           this.config.stopLoader();
//           //console.log("Something went wrong");
//         }
//       });
//   }
  
//   applyFilter(filterValue: string) {
//     filterValue = filterValue.trim();
//     filterValue = filterValue.toLowerCase();
//     this.dataSource.filter = filterValue;
//     this.getTotalAmount();
//   }


//   resetDatasourceHandlerClients(data) {
//     // //console.log(data);
//     // this.daybookForm.value.client_Id = data[0].client_Id;
//     // this.client_Name = data[0].client_Name;
//     // this.hideSearch=true;
//   }
  
//   onClientSelection(data) {
//     this.getNotification()
//   }

//   getTotalAmount() {
//     this.totalFees = 0;
//     this.totalPaid = 0;
//     this.totalBalance = 0;
//     if (typeof this.dataSource.filteredData == 'undefined') {
//       return;
//     }
//     for (let i = 0; i < this.dataSource.filteredData.length; i++) {
//       this.totalFees += this.dataSource.filteredData[i].fees;
//       this.totalPaid += this.dataSource.filteredData[i].paid;
//       this.totalBalance += this.dataSource.filteredData[i].balance;
//     }
//   }

//     export() {
//     const options = {
//       fieldSeparator: ',',
//       quoteStrings: '"',
//       decimalSeparator: '.',
//       showLabels: true,
//       showTitle: false,
//       title: 'client balance report',
//       useTextFile: false,
//       useBom: true,
//       useKeysAsHeaders: true,
//       filename:'Balance Report'
//     };
//     const csvExporter = new ExportToCsv(options);
//     let final = this.notification.map(({name,entityName,mobile,fees,paid,balance}) => ({name,entityName,mobile,fees,paid,balance}))
//     csvExporter.generateCsv(final);
//   }

// }

