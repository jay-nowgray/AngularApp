import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ExportToCsv } from 'export-to-csv';
import { ClientsService } from 'src/app/pages/crm/clients/clients.service';
import { ReportsService } from 'src/app/pages/reports/reports.service';
import { Config } from 'src/app/utility/config';


@Component({
  selector: 'app-balance-report',
  templateUrl: './balance-report.component.html',
  styleUrls: ['./balance-report.component.scss']
})
export class BalanceReportComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['name', 'entityName', 'mobile', 'fees', 'paid', 'balance', 'action'];
  columnsToDisplay: string[] = ['name', 'entityName', 'mobile', 'fees', 'paid', 'balance', 'action'];
  dataSource: any;
  balanceReport: any;
  ClientList: any;
  totalFees: number;
  totalPaid: number;
  totalBalance: number;
  ClientId:any;
 

  constructor(
    private ReportApi: ReportsService,
    private config: Config,
    private clientApi: ClientsService,
    private route: ActivatedRoute,
    private router: Router,
  ) { 
    this.ClientId = parseInt(this.route.snapshot.paramMap.get("id"));
  }

  ngOnInit(): void {
   
    this.getClientBalance(0);
  }

  getClientBalance(id) {
    this.config.startLoader();
    this.ReportApi.GetClientBalanceReport(id).subscribe(res => {
      this.config.stopLoader();
      if (res.status == 1) {
        this.balanceReport = res.clientBalance;
        this.dataSource = new MatTableDataSource(this.balanceReport);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.getTotalAmount()
      }
      else {
      }
    });
  }
  loadClient(client_Id) {
    this.router.navigate(["/crm/clients-bill/" + client_Id]);
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
    this.getClientBalance(data.client_Id)
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
    let final = this.balanceReport.map(({name,entityName,mobile,fees,paid,balance}) => ({name,entityName,mobile,fees,paid,balance}))
    csvExporter.generateCsv(final);
  }

}

