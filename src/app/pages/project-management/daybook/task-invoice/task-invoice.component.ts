import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DaybookService } from '../daybook.service';

@Component({
  selector: 'app-task-invoice',
  templateUrl: './task-invoice.component.html',
  styleUrls: ['./task-invoice.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TaskInvoiceComponent implements OnInit {
  report: any;
  taskId: number;

  constructor(
    private api: DaybookService,
    private route: ActivatedRoute
  ) {
    this.taskId = parseInt(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.getReport();
   
  }
  getReport() {
    this.api.GetInvoice(this.taskId).subscribe(res => {
    
      this.report = res.result;
    });
  }
  getSum(): number {
    let sum = 0;
    for (let i = 0; i < this.report.Tasks.length; i++) {
      sum += this.report.Tasks[i].totalAmount;
    }
    return sum;
  }
  getPaid(): number {
    let sum = 0;
    for (let i = 0; i < this.report.Tasks.length; i++) {
      sum += this.report.Tasks[i].paidAmount;
    }
    return sum;
  }

  onPrint() {
    window.print();
  }

}
