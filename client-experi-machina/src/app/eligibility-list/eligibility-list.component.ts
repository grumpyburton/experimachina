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
import {Eligibility} from "../eligibility";


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
      expireDate: ''
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
