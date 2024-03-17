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
import {Control} from "../control";
import {Survey} from "../survey";
import {DialogSurveyEligibility} from "../survey-list/survey-list.component";



@Component({
  selector: 'app-control-list',
  templateUrl: './control-list.component.html',
  styleUrls: ['./control-list.component.css']
})
export class ControlListComponent implements AfterViewInit{

  constructor(public dialog: MatDialog) {
    this.apiService.getControls(this.activeOnly).subscribe( controls =>
        this.dataSource.data = controls);

    this.newControl = this.getNewControl();
  }

  apiService: ApiService = inject(ApiService);

  displayedColumns: string[] = ['id', 'name','description','active','actions'];
  dataSource = new MatTableDataSource<Control>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  newControl: Control;
  activeOnly: false;

  getNewControl(): Control
  {
    var e: Control = {
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
    this.apiService.getControls(this.activeOnly).subscribe( controls =>
        this.dataSource.data = controls);
  }

  deleteControl(exp: Control)
  {
    this.apiService.deleteControl(exp).subscribe( controls =>
        this.dataSource.data = controls);
  }
  openNewControlDialog() {
    const dialogRef =
        this.dialog.open(DialogControl,{
          width:'80%',
          data: this.newControl
        });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result != null)
      {
        console.log("Call createControl");
        this.apiService.createControl(result).subscribe( controls =>
            this.dataSource.data = controls);

        this.newControl = this.getNewControl();
      }
    });
  }

  openEditControlEligibilityDialog(exp: Survey): void {
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

        this.newControl = this.getNewControl();
      }
    });
  }

  openEditControlDialog(exp: Control): void {
    const dialogRef =
        this.dialog.open(DialogControl,{
          width:'80%',
          data: exp
        });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result != null)
      {
        console.log("Call saveControl");
        this.apiService.saveControl(result).subscribe( controls =>
            this.dataSource.data = controls);

        this.newControl = this.getNewControl();
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
  confirmDialog(exp: Control): void {
    const message = `Are you sure you want to delete control group ` + exp.name + ' ?';
    const dialogData = new ConfirmDialogModel("Confirm delete", message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "600px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      console.log('after close: ' + dialogResult);
      if (dialogResult) {
        this.deleteControl(exp);
      }
    });
  }
}

// ------------------------------------------------
// DialogControl Component
// ------------------------------------------------
@Component({
  selector: 'dialog-control',
  templateUrl: 'dialog-control.html',
  styleUrls: ['./control-list.component.css'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatInputModule, MatIconModule, MatCardModule, FormsModule, MatSlideToggleModule, MatDatepickerModule],

})
export class DialogControl {

  constructor(
      public dialogRef: MatDialogRef<DialogControl>,
      @Inject(MAT_DIALOG_DATA) public data: Control,
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
