import {AfterViewInit, Component, Inject, inject, Input, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {ApiService} from "../api.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ConfirmDialogComponent, ConfirmDialogModel} from "../confirm-dialog/confirm-dialog.component";
import {Audience} from "../audience";
import {Customer} from "../customer";

@Component({
  selector: 'app-audience-list',
  templateUrl: './audience-list.component.html',
  styleUrls: ['./audience-list.component.css']
})
export class AudienceListComponent  implements AfterViewInit{

  constructor(public dialog: MatDialog) {
    this.apiService.getAudiences(true).subscribe( audiences =>
        this.dataSource.data = audiences);
  }

  apiService: ApiService = inject(ApiService);

  displayedColumns: string[] = ['id','name','type','size','active','startEndDate','actions'];
  dataSource = new MatTableDataSource<Audience>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;




  deleteAudience(audience: Audience)
  {
    this.apiService.deleteAudience(audience).subscribe( audiences =>
        this.dataSource.data = audiences);
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

  getSize(customers: Customer[]) : number
  {
    if(customers != null)
    {
      return customers.length;
    }
    else
    {
      return 0;
    }

  }

  // Confirmation dialog for deletes
  confirmDialog(audience: Audience): void {
    const message = `Are you sure you want to delete audience ` + audience.name + ' ?';
    const dialogData = new ConfirmDialogModel("Confirm delete", message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "600px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      console.log('after close: ' + dialogResult);
      if (dialogResult) {
        this.deleteAudience(audience);
      }
    });
  }
}