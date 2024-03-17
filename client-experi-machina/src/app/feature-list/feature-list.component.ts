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
import {Feature} from "../feature";
import {Survey} from "../survey";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {SelectionModel} from "@angular/cdk/collections";

@Component({
  selector: 'app-feature-list',
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.css']
})
export class FeatureListComponent implements AfterViewInit{

  constructor(public dialog: MatDialog) {
    this.apiService.getFeatures(this.activeOnly).subscribe( features =>
        this.dataSource.data = features);

    this.newFeature = this.getNewFeature();
  }

  apiService: ApiService = inject(ApiService);

  displayedColumns: string[] = ['id', 'name','description','active','actions'];
  dataSource = new MatTableDataSource<Feature>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  newFeature: Feature;
  activeOnly: false;

  getNewFeature(): Feature
  {
    var e: Feature = {
      id: -1,
      name: '',
      description: '',
      active: false,
      createDate: '',
      updateDate: '',
      startDate: '',
      endDate: '',
      expireDate: '',
      eligibilities:[]
    };
    return  e;
  }

  toggleActiveOnly()
  {
    console.log("toggle");
    this.apiService.getFeatures(this.activeOnly).subscribe( features =>
        this.dataSource.data = features);
  }

  deleteFeature(exp: Feature)
  {
    this.apiService.deleteFeature(exp).subscribe( features =>
        this.dataSource.data = features);
  }
  openNewFeatureDialog() {
    const dialogRef =
        this.dialog.open(DialogFeature,{
          width:'80%',
          data: this.newFeature
        });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result != null)
      {
        console.log("Call createFeature");
        this.apiService.createFeature(result).subscribe( features =>
            this.dataSource.data = features);

        this.newFeature = this.getNewFeature();
      }
    });
  }

  openEditFeatureEligibilityDialog(exp: Survey): void {
    const dialogRef =
        this.dialog.open(DialogFeatureEligibility,{
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

        this.newFeature = this.getNewFeature();
      }
    });
  }

  openEditFeatureDialog(exp: Feature): void {
    const dialogRef =
        this.dialog.open(DialogFeature,{
          width:'80%',
          data: exp
        });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result != null)
      {
        console.log("Call saveFeature");
        this.apiService.saveFeature(result).subscribe( features =>
            this.dataSource.data = features);

        this.newFeature = this.getNewFeature();
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
  confirmDialog(exp: Feature): void {
    const message = `Are you sure you want to delete feature group ` + exp.name + ' ?';
    const dialogData = new ConfirmDialogModel("Confirm delete", message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "600px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      console.log('after close: ' + dialogResult);
      if (dialogResult) {
        this.deleteFeature(exp);
      }
    });
  }
}


// ------------------------------------------------
// DialogFeatureEligibility Component
// ------------------------------------------------
@Component({
  selector: 'dialog-feature-eligibility',
  templateUrl: 'dialog-feature-eligibility.html',
  styleUrls: ['./feature-list.component.css'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatInputModule, MatIconModule,
    MatCardModule, FormsModule, MatSlideToggleModule, MatDatepickerModule, MatGridListModule,
    MatCheckboxModule, MatTableModule],

})
export class DialogFeatureEligibility {

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

  constructor(public dialogRef: MatDialogRef<DialogFeature>,
              @Inject(MAT_DIALOG_DATA) public data: Feature) {

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
    this.apiService.saveFeature(this.data).subscribe(
        // do nothing
    );
    console.log(this.data);
    this.dialogRef.close();
  }
}


// ------------------------------------------------
// DialogFeature Component
// ------------------------------------------------
@Component({
  selector: 'dialog-feature',
  templateUrl: 'dialog-feature.html',
  styleUrls: ['./feature-list.component.css'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatInputModule, MatIconModule, MatCardModule, FormsModule, MatSlideToggleModule, MatDatepickerModule],

})
export class DialogFeature {

  constructor(
      public dialogRef: MatDialogRef<DialogFeature>,
      @Inject(MAT_DIALOG_DATA) public data: Feature,
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
