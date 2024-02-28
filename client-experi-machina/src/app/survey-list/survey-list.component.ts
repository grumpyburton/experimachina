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
import {Survey} from "../survey";

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
      expireDate: ''
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

  constructor(
      public dialogRef: MatDialogRef<DialogSurvey>,
      @Inject(MAT_DIALOG_DATA) public data: Survey,
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
