import {AfterViewInit, Component, Inject, inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {ApiService} from "../api.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ConfirmDialogComponent, ConfirmDialogModel} from "../confirm-dialog/confirm-dialog.component";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {FormsModule} from "@angular/forms";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {Segment} from "../segment";


@Component({
  selector: 'app-segment-list',
  templateUrl: './segment-list.component.html',
  styleUrls: ['./segment-list.component.css']
})
export class SegmentListComponent implements AfterViewInit{

  constructor(public dialog: MatDialog) {
    this.apiService.getSegments(this.activeOnly).subscribe( segments =>
        this.dataSource.data = segments);

    this.newSegment = this.getNewSegment();
  }

  apiService: ApiService = inject(ApiService);

  displayedColumns: string[] = ['id','code', 'name','description','active','actions'];
  dataSource = new MatTableDataSource<Segment>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  newSegment: Segment;
  activeOnly: false;

  getNewSegment(): Segment
  {
    var e: Segment = {
      id: -1,
      name: '',
      description: '',
      code: '',
      active: false,
      createDate: '',
      updateDate: '',
      startDate: '',
      endDate: '',
      expireDate: ''
    };
    return  e;
  }

  toggleActiveOnly()
  {
    console.log("toggle");
    this.apiService.getSegments(this.activeOnly).subscribe( segments =>
        this.dataSource.data = segments);
  }

  deleteSegment(exp: Segment)
  {
    this.apiService.deleteSegment(exp).subscribe( segments =>
        this.dataSource.data = segments);
  }
  openNewSegmentDialog() {
    const dialogRef =
        this.dialog.open(DialogSegment,{
          width:'80%',
          data: this.newSegment
        });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result != null)
      {
        console.log("Call createSegment");
        this.apiService.createSegment(result).subscribe( segments =>
            this.dataSource.data = segments);

        this.newSegment = this.getNewSegment();
      }
    });
  }

  openEditSegmentDialog(exp: Segment): void {
    const dialogRef =
        this.dialog.open(DialogSegment,{
          width:'80%',
          data: exp
        });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result != null)
      {
        console.log("Call saveSegment");
        this.apiService.saveSegment(result).subscribe( segments =>
            this.dataSource.data = segments);

        this.newSegment = this.getNewSegment();
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
  confirmDialog(exp: Segment): void {
    const message = `Are you sure you want to delete segment ` + exp.name + ' ?';
    const dialogData = new ConfirmDialogModel("Confirm delete", message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "600px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      console.log('after close: ' + dialogResult);
      if (dialogResult) {
        this.deleteSegment(exp);
      }
    });
  }
}

// ------------------------------------------------
// DialogSegment Component
// ------------------------------------------------
@Component({
  selector: 'dialog-segment',
  templateUrl: 'dialog-segment.html',
  styleUrls: ['./segment-list.component.css'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatInputModule, MatIconModule, MatCardModule, FormsModule, MatSlideToggleModule, MatDatepickerModule],

})
export class DialogSegment {

  constructor(
      public dialogRef: MatDialogRef<DialogSegment>,
      @Inject(MAT_DIALOG_DATA) public data: Segment,
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
