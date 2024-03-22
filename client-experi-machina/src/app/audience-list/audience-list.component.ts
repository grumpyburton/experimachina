import {AfterViewInit, Component, Inject, inject, Input, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {ApiService} from "../api.service";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {Customer} from "../customer";
import {MatPaginator} from "@angular/material/paginator";
import {ConfirmDialogComponent, ConfirmDialogModel} from "../confirm-dialog/confirm-dialog.component";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {FormsModule} from "@angular/forms";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {SelectionModel} from "@angular/cdk/collections";
import {Audience} from "../audience";

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

  displayedColumns: string[] = ['id','name','active','actions'];
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