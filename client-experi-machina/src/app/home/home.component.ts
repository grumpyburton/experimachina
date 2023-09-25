import {AfterViewInit, Component, inject, ViewChild} from '@angular/core';
import {CustomerService} from "../customer.service";
import {MatTableDataSource} from "@angular/material/table";
import {Customer} from "../customer";
import {MatPaginator} from "@angular/material/paginator";
import {HttpClient} from "@angular/common/http";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])]
})
export class HomeComponent implements AfterViewInit {

  customerService: CustomerService = inject(CustomerService);

  displayedColumns: string[] = ['id', 'firstName', 'surname'];
  dataSource = new MatTableDataSource<Customer>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private http: HttpClient) {

    this.customerService.getAllCustomersPage().subscribe(paging =>
      this.dataSource.data = paging.content as Customer[]);
    //console.log(paging);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
