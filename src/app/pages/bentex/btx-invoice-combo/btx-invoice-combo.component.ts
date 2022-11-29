import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TimeBtxService } from '../time-btx.service';

@Component({
  selector: 'app-btx-invoice-combo',
  templateUrl: './btx-invoice-combo.component.html',
  styleUrls: ['./btx-invoice-combo.component.scss']
})
export class BtxInvoiceComboComponent implements OnInit {
  userId: any;
  startDate: any;
  endDate: any;
  unBilledReport: any;
  GrandTotal: number;

  constructor(private route: ActivatedRoute, private api: TimeBtxService) {
    this.route.queryParams.subscribe(params => {
      this.userId = params['UserId'];
      this.startDate = params['startDate'];
      this.endDate = params['endDate'];
    });
  }

  ngOnInit() {
    this.api.DailyReportsUnBilledByUserId(0, this.startDate, this.endDate).subscribe(res => {
      //console.log(res);
      this.unBilledReport= res.unBilledReport;
      //console.log(this.unBilledReport);
      let total = 0;

      this.unBilledReport.forEach((item) => {
        total += Number(item.toBeBilled);
      });
    
      this.GrandTotal=total;
    });
  }

  
}
