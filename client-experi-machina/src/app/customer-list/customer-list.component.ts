import {AfterViewInit, Component, Inject, inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {ApiService} from "../api.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Customer} from "../customer";
import {MatCardModule} from "@angular/material/card";
import {FormsModule} from "@angular/forms";
import {ConfirmDialogComponent, ConfirmDialogModel} from "../confirm-dialog/confirm-dialog.component";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatDatepickerModule} from "@angular/material/datepicker";


@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements AfterViewInit{

  constructor(public dialog: MatDialog) {
    this.apiService.getCustomers(this.activeOnly).subscribe( customers =>
        this.dataSource.data = customers);

    this.newCustomer = this.getNewCustomer();
  }

  apiService: ApiService = inject(ApiService);

  displayedColumns: string[] = ['id','key', 'firstName','surname','active','actions'];
  dataSource = new MatTableDataSource<Customer>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  newCustomer: Customer;
  activeOnly: false;

  getNewCustomer(): Customer
  {
    var e: Customer = {
      id: -1,
      firstName: '',
      surname: '',
      active: false,
      createDate: '',
      updateDate: '',
      startDate: '',
      endDate: '',
      expireDate: '',
      key:''
    };
    return  e;
  }

  toggleActiveOnly()
  {
    console.log("toggle");
    this.apiService.getCustomers(this.activeOnly).subscribe( customers =>
        this.dataSource.data = customers);
  }

  deleteCustomer(exp: Customer)
  {
    this.apiService.deleteCustomer(exp).subscribe( customers =>
        this.dataSource.data = customers);
  }
  openNewCustomerDialog() {
    const dialogRef =
        this.dialog.open(DialogCustomer,{
          width:'80%',
          data: this.newCustomer
        });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result != null)
      {
        console.log("Call createCustomer");
        this.apiService.createCustomer(result).subscribe( customers =>
            this.dataSource.data = customers);

        this.newCustomer = this.getNewCustomer();
      }
    });
  }

  openEditCustomerDialog(exp: Customer): void {
    const dialogRef =
        this.dialog.open(DialogCustomer,{
          width:'80%',
          data: exp
        });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result != null)
      {
        console.log("Call saveCustomer");
        this.apiService.saveCustomer(result).subscribe( customers =>
            this.dataSource.data = customers);

        this.newCustomer = this.getNewCustomer();
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // Confirmation dialog for deletes
  confirmDialog(exp: Customer): void {
    const message = `Are you sure you want to delete customer ` + exp.firstName + ' ?';
    const dialogData = new ConfirmDialogModel("Confirm delete", message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "600px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      console.log('after close: ' + dialogResult);
      if (dialogResult) {
        this.deleteCustomer(exp);
      }
    });
  }
}

// ------------------------------------------------
// DialogCustomer Component
// ------------------------------------------------
@Component({
  selector: 'dialog-customer',
  templateUrl: 'dialog-customer.html',
  styleUrls: ['./customer-list.component.css'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatInputModule, MatIconModule, MatCardModule, FormsModule, MatSlideToggleModule, MatDatepickerModule],

})
export class DialogCustomer {

  constructor(
      public dialogRef: MatDialogRef<DialogCustomer>,
      @Inject(MAT_DIALOG_DATA) public data: Customer,
  ) {
    console.log(data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  log(o:Object)
  {
    console.log(o);
  }

}
