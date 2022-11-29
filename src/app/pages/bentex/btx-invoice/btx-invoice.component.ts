import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { TimeBtxService } from '../time-btx.service';

@Component({
  selector: 'app-btx-invoice',
  templateUrl: './btx-invoice.component.html',
  styleUrls: ['./btx-invoice.component.scss']
})
export class BtxInvoiceComponent implements OnInit {
  userId: any;
  startDate: any;
  endDate: any;
  unBilledReport: any;
  unBilledReportList: any;

  constructor(private route: ActivatedRoute, private api: TimeBtxService) {
    this.route.queryParams.subscribe(params => {
      this.userId = params['UserId'];
      this.startDate = params['startDate'];
      this.endDate = params['endDate'];
    });
  }

  ngOnInit() {
    this.api.DailyReportsUnBilledByUserId(this.userId, this.startDate, this.endDate).subscribe(res => {
      //console.log(res);
      this.unBilledReport= res.unBilledReport[0];
      this.unBilledReportList= res.unBilledReport;
    });
  }
sum(){
  let total = 0;
  for(let data of this.unBilledReportList){
    total += data.toBeBilled;
  }
  return total;
}
}