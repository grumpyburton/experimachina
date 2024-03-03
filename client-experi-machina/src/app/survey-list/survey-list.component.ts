import {AfterViewInit, Component, Inject, inject, Input, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {ApiService} from "../api.service";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ConfirmDialogComponent, ConfirmDialogModel} from "../confirm-dialog/confirm-dialog.component";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {FormsModule} from "@angular/forms";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {Survey} from "../survey";
import {MatGridListModule} from "@angular/material/grid-list";
import {Eligibility} from "../eligibility";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {SelectionModel} from "@angular/cdk/collections";

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.css']
})
export class SurveyListComponent implements AfterViewInit{

  constructor(public dialog: MatDialog) {
    this.apiService.getSurveys(this.activeOnly).subscribe( surveys =>
        this.dataSource.data = surveys);

    this.newSurvey = this.getNewSurvey();
  }

  apiService: ApiService = inject(ApiService);
  displayedColumns: string[] = ['id','code', 'name','description','active','actions'];
  dataSource = new MatTableDataSource<Survey>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  newSurvey: Survey;
  activeOnly: false;

  getNewSurvey(): Survey
  {
    var e: Survey = {
      id: -1,
      name: '',
      description: '',
      code: '',
      active: false,
      createDate: '',
      updateDate: '',
      startDate: '',
      endDate: '',
      expireDate: '',
      eligibilities: []
    };
    return  e;
  }

  toggleActiveOnly()
  {
    console.log("toggle");
    this.apiService.getSurveys(this.activeOnly).subscribe( surveys =>
        this.dataSource.data = surveys);
  }

  deleteSurvey(exp: Survey)
  {
    this.apiService.deleteSurvey(exp).subscribe( surveys =>
        this.dataSource.data = surveys);
  }
  openNewSurveyDialog() {
    const dialogRef =
        this.dialog.open(DialogSurvey,{
          width:'80%',
          data: this.newSurvey
        });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result != null)
      {
        console.log("Call createSurvey");
        this.apiService.createSurvey(result).subscribe( surveys =>
            this.dataSource.data = surveys);

        this.newSurvey = this.getNewSurvey();
      }
    });
  }

  openEditSurveyDialog(exp: Survey): void {
    const dialogRef =
        this.dialog.open(DialogSurvey,{
          width:'80%',
          data: exp
        });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result != null)
      {
        console.log("Call saveSurvey");
        this.apiService.saveSurvey(result).subscribe( surveys =>
            this.dataSource.data = surveys);

        this.newSurvey = this.getNewSurvey();
      }
    });
  }

  openEditSurveyEligibilityDialog(exp: Survey): void {
    const dialogRef =
        this.dialog.open(DialogSurveyEligibility,{
          width:'80%',
          data: exp
        });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result != null)
      {
        console.log("Call saveSurvey");
        this.apiService.saveSurvey(result).subscribe( surveys =>
            this.dataSource.data = surveys);

        this.newSurvey = this.getNewSurvey();
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
  confirmDialog(exp: Survey): void {
    const message = `Are you sure you want to delete survey ` + exp.name + ' ?';
    const dialogData = new ConfirmDialogModel("Confirm delete", message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "600px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      console.log('after close: ' + dialogResult);
      if (dialogResult) {
        this.deleteSurvey(exp);
      }
    });
  }
}

// ------------------------------------------------
// DialogSurveyEligibility Component
// ------------------------------------------------
@Component({
  selector: 'dialog-survey-eligibility',
  templateUrl: 'dialog-survey-eligibility.html',
  styleUrls: ['./survey-list.component.css'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatInputModule, MatIconModule, MatCardModule, FormsModule, MatSlideToggleModule, MatDatepickerModule, MatGridListModule, MatCheckboxModule, MatTableModule],

})
export class DialogSurveyEligibility {

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

  constructor(public dialogRef: MatDialogRef<DialogSurvey>,
              @Inject(MAT_DIALOG_DATA) public data: Survey) {

    this.dataSourceEligibilityTo.data = data.eligibilities;

    this.apiService.getEligibilities(this.activeOnly).subscribe( eligibilities =>
    {
      this.dataSourceEligibilityFrom.data = eligibilities;
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
    this.data.eligibilities = this.dataSourceEligibilityTo.data;
    this.apiService.saveSurvey(this.data).subscribe(
      // do nothing
    );
    console.log(this.data);
    this.dialogRef.close();
  }

}


// ------------------------------------------------
// DialogSurvey Component
// ------------------------------------------------
@Component({
  selector: 'dialog-survey',
  templateUrl: 'dialog-survey.html',
  styleUrls: ['./survey-list.component.css'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatInputModule, MatIconModule, MatCardModule, FormsModule, MatSlideToggleModule, MatDatepickerModule],

})
export class DialogSurvey {

  to: [];
  from:[];

  constructor(
      public dialogRef: MatDialogRef<DialogSurvey>,
      @Inject(MAT_DIALOG_DATA) public data: Survey
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
