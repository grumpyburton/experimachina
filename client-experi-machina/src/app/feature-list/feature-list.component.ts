import {AfterViewInit, Component, Inject, inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {ApiService} from "../api.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatCardModule} from "@angular/material/card";
import {FormsModule} from "@angular/forms";
import {ConfirmDialogComponent, ConfirmDialogModel} from "../confirm-dialog/confirm-dialog.component";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {Feature} from "../feature";




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
      expireDate: ''
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
