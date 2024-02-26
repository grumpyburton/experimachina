import {AfterViewInit, Component, inject, ViewChild} from '@angular/core';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {ApiService} from "../api.service";
import {MatTableDataSource} from "@angular/material/table";
import {Customer} from "../customer";
import {MatPaginator} from "@angular/material/paginator";
import {Experiment} from "../experiment";
import {MatCardModule} from "@angular/material/card";

@Component({
  selector: 'app-experiment-list',
  templateUrl: './experiment-list.component.html',
  styleUrls: ['./experiment-list.component.css']
})
export class ExperimentListComponent implements AfterViewInit{

  constructor(public dialog: MatDialog) {
    this.apiService.getExperiments().subscribe( experiments =>
        this.dataSource.data = experiments);
  }

  apiService: ApiService = inject(ApiService);

  displayedColumns: string[] = ['id', 'name','description','actions'];
  dataSource = new MatTableDataSource<Experiment>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  openDialog() {
    const dialogRef = this.dialog.open(DialogExperiment,{width:'80%'});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
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
}

@Component({
  selector: 'dialog-experiment',
  templateUrl: 'dialog-experiment.html',
  styleUrls: ['./experiment-list.component.css'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatInputModule, MatIconModule, MatCardModule],
})
export class DialogExperiment {}
