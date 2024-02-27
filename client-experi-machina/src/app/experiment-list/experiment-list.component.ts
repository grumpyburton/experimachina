import {AfterViewInit, Component, Inject, inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {ApiService} from "../api.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Experiment} from "../experiment";
import {MatCardModule} from "@angular/material/card";
import {FormsModule} from "@angular/forms";
import {ConfirmDialogComponent, ConfirmDialogModel} from "../confirm-dialog/confirm-dialog.component";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatDatepickerModule} from "@angular/material/datepicker";


@Component({
  selector: 'app-experiment-list',
  templateUrl: './experiment-list.component.html',
  styleUrls: ['./experiment-list.component.css']
})
export class ExperimentListComponent implements AfterViewInit{

  constructor(public dialog: MatDialog) {
    this.apiService.getExperiments(this.activeOnly).subscribe( experiments =>
        this.dataSource.data = experiments);

    this.newExperiment = this.getNewExperiment();
  }

  apiService: ApiService = inject(ApiService);

  displayedColumns: string[] = ['id', 'name','description','active','actions'];
  dataSource = new MatTableDataSource<Experiment>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  newExperiment: Experiment;
  activeOnly: false;

  getNewExperiment(): Experiment
  {
    var e: Experiment = {
      id: -1,
      name: '',
      description: '',
      problem: '',
      objective: '',
      hypothesis: '',
      outcome: '',
      active: false
    };
    return  e;
  }

  toggleActiveOnly()
  {
    console.log("toggle");
    this.apiService.getExperiments(this.activeOnly).subscribe( experiments =>
        this.dataSource.data = experiments);
  }

  deleteExperiment(exp: Experiment)
  {
    this.apiService.deleteExperiment(exp).subscribe( experiments =>
        this.dataSource.data = experiments);
  }
  openNewExperimentDialog() {
    const dialogRef =
        this.dialog.open(DialogExperiment,{
          width:'80%',
          data: this.newExperiment
        });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result != null)
      {
          console.log("Call createExperiment");
          this.apiService.createExperiment(result).subscribe( experiments =>
            this.dataSource.data = experiments);

        this.newExperiment = this.getNewExperiment();
      }
    });
  }

  openEditExperimentDialog(exp: Experiment): void {
    const dialogRef =
        this.dialog.open(DialogExperiment,{
          width:'80%',
          data: exp
        });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result != null)
      {
        console.log("Call saveExperiment");
        this.apiService.saveExperiment(result).subscribe( experiments =>
            this.dataSource.data = experiments);

        this.newExperiment = this.getNewExperiment();
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
  confirmDialog(exp: Experiment): void {
    const message = `Are you sure you want to delete experiment ` + exp.name + ' ?';
    const dialogData = new ConfirmDialogModel("Confirm delete", message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "600px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      console.log('after close: ' + dialogResult);
      if (dialogResult) {
        this.deleteExperiment(exp);
      }
    });
  }
}

// ------------------------------------------------
// DialogExperiment Component
// ------------------------------------------------
@Component({
  selector: 'dialog-experiment',
  templateUrl: 'dialog-experiment.html',
  styleUrls: ['./experiment-list.component.css'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatInputModule, MatIconModule, MatCardModule, FormsModule, MatSlideToggleModule, MatDatepickerModule],

})
export class DialogExperiment {

  constructor(
      public dialogRef: MatDialogRef<DialogExperiment>,
      @Inject(MAT_DIALOG_DATA) public data: Experiment,
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
