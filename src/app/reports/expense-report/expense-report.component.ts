import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { ExportToCsv } from 'export-to-csv';
import { ReportsService } from 'src/app/pages/reports/reports.service';
import { Config } from 'src/app/utility/config';

@Component({
  selector: 'app-expense-report',
  templateUrl: './expense-report.component.html',
  styleUrls: ['./expense-report.component.scss']
})
export class ExpenseReportComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['account_Head', 'total'];
  columnsToDisplay: string[] = ['account_Head', 'total'];

  dataSource: any;
  ExpenseReport: any;
  fy: any;
  total: any;
  GetFinancialYear: any;
  financialYear: any;

  constructor( private Reportapi: ReportsService,
    private config: Config,
    private router: Router,) { }

  ngOnInit() {
    this.getFYList();
    this.getReport();
  }
  getFYList() {

    this.Reportapi.GetFinancialYear().subscribe(
      res => {
        this.financialYear = res.financialYear;
      },
      err => {
       
      }
    );
  }
  getReport() {
    this.config.startLoader();
    this.Reportapi.GetExpenseReport(this.fy).subscribe(res => {
      this.config.stopLoader();
      if (res.status == 1) {
        this.ExpenseReport = res.expenseReportGroupedByHeadByFY;
        this.dataSource = new MatTableDataSource(this.ExpenseReport);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.getTotalAmount()
      }
      else {
      }
    });
   
  }
  resetData() {
    this.fy = 0;
    this.getReport();
  }
  onPrint() {
    window.print();
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
    this.getTotalAmount();
  }
  getTotalAmount() {
    this.total = 0;
    if (typeof this.dataSource.filteredData == 'undefined') {
      return;
    }
    for (let i = 0; i < this.dataSource.filteredData.length; i++) {
      this.total += this.dataSource.filteredData[i].total;
      if (this.dataSource.filteredData[i].total > 0) {
        this.total += this.dataSource.filteredData[i].total;
      }
    }
  }

    export() {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: false,
      title: 'Expenses report',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename:'Expenses Report'
    };
    const csvExporter = new ExportToCsv(options);
    let final = this.ExpenseReport.map(({account_Head,total}) => ({account_Head,total}))
    csvExporter.generateCsv(final);
  }
}
