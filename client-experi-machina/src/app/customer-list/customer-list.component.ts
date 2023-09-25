import {AfterViewInit, Component, inject, ViewChild} from '@angular/core';
import {CustomerService} from "../customer.service";
import {HttpClient} from "@angular/common/http";
import {Customer} from "../customer";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])]
})
export class CustomerListComponent  implements AfterViewInit {

  customerService: CustomerService = inject(CustomerService);

  displayedColumns: string[] = ['id', 'firstName','surname'];
  dataSource = new MatTableDataSource<Customer>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private http: HttpClient) {

    this.customerService.getAllCustomersPage().subscribe( paging =>
      this.dataSource.data = paging.content as Customer[]);
      //console.log(paging);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
