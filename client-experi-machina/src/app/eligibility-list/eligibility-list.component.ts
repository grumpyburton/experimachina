import {AfterViewInit, Component, Inject, inject, Input, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {ApiService} from "../api.service";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatCardModule} from "@angular/material/card";
import {FormsModule} from "@angular/forms";
import {ConfirmDialogComponent, ConfirmDialogModel} from "../confirm-dialog/confirm-dialog.component";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {Eligibility} from "../eligibility";
import {SelectionModel} from "@angular/cdk/collections";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {Survey} from "../survey";


@Component({
  selector: 'app-eligibility-list',
  templateUrl: './eligibility-list.component.html',
  styleUrls: ['./eligibility-list.component.css']
})
export class EligibilityListComponent implements AfterViewInit{

  constructor(public dialog: MatDialog) {
    this.apiService.getEligibilities(this.activeOnly).subscribe( eligibilities =>
        this.dataSource.data = eligibilities);

    this.newEligibility = this.getNewEligibility();
  }

  apiService: ApiService = inject(ApiService);

  displayedColumns: string[] = ['id', 'name','description','active','actions'];
  dataSource = new MatTableDataSource<Eligibility>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  newEligibility: Eligibility;
  activeOnly: false;

  getNewEligibility(): Eligibility
  {
    var e: Eligibility = {
      id: -1,
      name: '',
      description: '',
      createDate: '',
      updateDate: '',
      startDate: '',
      endDate: '',
      expireDate: '',
      active: true,
      segments: []
    };
    return  e;
  }

  toggleActiveOnly()
  {
    console.log("toggle");
    this.apiService.getEligibilities(this.activeOnly).subscribe( eligibilities =>
        this.dataSource.data = eligibilities);
  }

  deleteEligibility(exp: Eligibility)
  {
    this.apiService.deleteEligibility(exp).subscribe( eligibilities =>
        this.dataSource.data = eligibilities);
  }
  openNewEligibilityDialog() {
    const dialogRef =
        this.dialog.open(DialogEligibility,{
          width:'80%',
          data: this.newEligibility
        });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result != null)
      {
        console.log("Call createEligibility");
        this.apiService.createEligibility(result).subscribe( eligibilities =>
            this.dataSource.data = eligibilities);

        this.newEligibility = this.getNewEligibility();
      }
    });
  }

  openEditEligibilityDialog(exp: Eligibility): void {
    const dialogRef =
        this.dialog.open(DialogEligibility,{
          width:'80%',
          data: exp
        });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result != null)
      {
        console.log("Call saveEligibility");
        this.apiService.saveEligibility(result).subscribe( eligibilities =>
            this.dataSource.data = eligibilities);

        this.newEligibility = this.getNewEligibility();
      }
    });
  }

  openEditEligibilitySegmentDialog(eligibility: Eligibility): void {
    const dialogRef =
        this.dialog.open(DialogEligibilitySegment,{
          width:'80%',
          data: eligibility
        });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result != null)
      {
        console.log("Call saveEligibility");
        this.apiService.saveEligibility(result).subscribe( eligibilities =>
            this.dataSource.data = eligibilities);

        //this.newSurvey = this.getNewSurvey();
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
  confirmDialog(exp: Eligibility): void {
    const message = `Are you sure you want to delete eligibility ` + exp.name + ' ?';
    const dialogData = new ConfirmDialogModel("Confirm delete", message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "600px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      console.log('after close: ' + dialogResult);
      if (dialogResult) {
        this.deleteEligibility(exp);
      }
    });
  }
}

// ------------------------------------------------
// DialogEligibility Component
// ------------------------------------------------
@Component({
  selector: 'dialog-eligibility',
  templateUrl: 'dialog-eligibility.html',
  styleUrls: ['./eligibility-list.component.css'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatInputModule, MatIconModule, MatCardModule, FormsModule, MatSlideToggleModule, MatDatepickerModule],

})
export class DialogEligibility {

  constructor(
      public dialogRef: MatDialogRef<DialogEligibility>,
      @Inject(MAT_DIALOG_DATA) public data: Eligibility,
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

// ------------------------------------------------
// DialogEligibilitySegment Component
// ------------------------------------------------
// @ts-ignore
@Component({
  selector: 'dialog-eligibility-segment',
  templateUrl: 'dialog-eligibility-segment.html',
  styleUrls: ['./eligibility-list.component.css'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatInputModule, MatIconModule, MatCardModule, FormsModule, MatSlideToggleModule, MatDatepickerModule, MatGridListModule, MatCheckboxModule, MatTableModule],

})
export class DialogEligibilitySegment {

  apiService: ApiService = inject(ApiService);
  activeOnly = true;

  dataSourceEligibilityFrom = new MatTableDataSource<any>([]);
  dataSourceEligibilityTo = new MatTableDataSource<any>([]);

  // Inputs from the parent for the component
  @Input()
  fromTitle: string = 'from not set';
  @Input()
  fromArray: any[] = [];
  @Input()
  toTitle: string = 'to not set';
  @Input()
  toArray: any[] = [];

  selectionFrom = new SelectionModel<any>(true, []);
  selectionTo = new SelectionModel<any>(true, []);
  displayedColumns: string[] = ['select', 'name'];

  to: [];
  from:[];

  constructor(public dialogRef: MatDialogRef<DialogEligibility>,
              @Inject(MAT_DIALOG_DATA) public data: Eligibility) {

    this.dataSourceEligibilityTo.data = data.segments;

    this.apiService.getSegments(this.activeOnly).subscribe( segments =>
    {
      this.dataSourceEligibilityFrom.data = segments;
      // remove the already selected ones
      var arrayLength = this.dataSourceEligibilityFrom.data.length;
      for (var i = 0; i < arrayLength; i++) {
        //this.removeItem(this.dataSourceEligibilityFrom, data.eligibilities[i]);
        for (var j = 0; j < this.dataSourceEligibilityTo.data.length; j++) {
          if(this.dataSourceEligibilityFrom.data[i] != null && this.dataSourceEligibilityTo.data[j] != null &&
              this.dataSourceEligibilityFrom.data[i].id == this.dataSourceEligibilityTo.data[j].id)
          {
            console.log("match - remove");
            this.dataSourceEligibilityFrom.data.splice(i, 1);
            this.dataSourceEligibilityFrom._updateChangeSubscription();
          }
        }
      }
    });

    console.log(data);
    console.log(this.dataSourceEligibilityFrom.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selectionFrom.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  removeTo(): void{
    if(this.selectionTo.selected.length > 0) {
      console.log(this.selectionTo.selected);
      this.dataSourceEligibilityFrom.data = this.dataSourceEligibilityFrom.data.concat(this.selectionTo.selected);

      var arrayLength = this.selectionTo.selected.length;
      for (var i = 0; i < arrayLength; i++) {
        this.removeItem(this.dataSourceEligibilityTo, this.selectionTo.selected[i]);
      }

      this.selectionTo.clear();
    }
  }

  addFrom(): void{
    if(this.selectionFrom.selected.length > 0) {
      console.log(this.selectionFrom.selected);
      this.dataSourceEligibilityTo.data = this.dataSourceEligibilityTo.data.concat(this.selectionFrom.selected);

      var arrayLength = this.selectionFrom.selected.length;
      for (var i = 0; i < arrayLength; i++) {
        this.removeItem(this.dataSourceEligibilityFrom, this.selectionFrom.selected[i]);
      }

      this.selectionFrom.clear();
    }
  }

  removeItem(dataSource: MatTableDataSource<any>, item: any): MatTableDataSource<any> {
    if (item) {
      const index = dataSource.data.indexOf(item);
      dataSource.data.splice(index, 1);
      dataSource._updateChangeSubscription();
    }
    return dataSource;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selectionFrom.selected.length;
    const numRows = this.dataSourceEligibilityFrom.data.length;
    return numSelected === numRows;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  log(o:Object)
  {
    console.log(o);
  }

  saveAndClose()
  {
    console.log("save and close");
    this.data.segments = this.dataSourceEligibilityTo.data;
    this.apiService.saveEligibility(this.data).subscribe(
        // do nothing
    );
    console.log(this.data);
    this.dialogRef.close();
  }

}
