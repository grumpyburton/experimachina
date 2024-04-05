import {AfterViewInit, Component, Inject, inject, Input, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {ApiService} from "../api.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ConfirmDialogComponent, ConfirmDialogModel} from "../confirm-dialog/confirm-dialog.component";
import {Audience} from "../audience";
import {Customer} from "../customer";
import {DatePipe} from "@angular/common";
import {Control} from "../control";
import {Experiment} from "../experiment";
import {Feature} from "../feature";
import {Survey} from "../survey";


@Component({
  selector: 'app-audience-list',
  templateUrl: './audience-list.component.html',
  styleUrls: ['./audience-list.component.css']
})
export class AudienceListComponent  implements AfterViewInit{

  constructor(public dialog: MatDialog, private datePipe: DatePipe) {
    this.apiService.getAudiences(true).subscribe( audiences =>
        this.dataSource.data = audiences);
  }

  apiService: ApiService = inject(ApiService);

  displayedColumns: string[] = ['id','name','type','typeName','size','startEndDate','actions'];
  dataSource = new MatTableDataSource<Audience>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;


  formatDate(sDate: string) : string | null
  {
      if(sDate != null)
      {
        return this.datePipe.transform(sDate, 'dd-MMM-yyyy');
      }
      else
      {
        return "";
      }

  }

  formatType(audience: Audience) : string
  {
    switch(audience.type) {
      case "Control Group":
          if(audience.controlGroup != null)
          {
            return (audience.controlGroup as Control).name;
          }
          else
          {
            return "";
          }
        break;
      case "Experiment":
        if(audience.experiment != null)
        {
          return (audience.experiment as Experiment).name;
        }
        else
        {
          return "";
        }
        break;
      case "Feature":
        if(audience.feature != null)
        {
          return (audience.feature as Feature).name;
        }
        else
        {
          return "";
        }
        break;
      case "Survey":
        if(audience.survey != null)
        {
          return (audience.survey as Survey).name;
        }
        else
        {
          return "";
        }
        break;
      default:
        // this is an error as we should have set something
        console.log("error: type not set");
        return "";
    }
  }

  deleteAudience(audience: Audience)
  {
    this.apiService.deleteAudience(audience).subscribe( audiences =>
        this.dataSource.data = audiences);
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

  getSize(customers: Customer[]) : number
  {
    if(customers != null)
    {
      return customers.length;
    }
    else
    {
      return 0;
    }

  }

  // Confirmation dialog for deletes
  confirmDialog(audience: Audience): void {
    const message = `Are you sure you want to delete audience ` + audience.name + ' ?';
    const dialogData = new ConfirmDialogModel("Confirm delete", message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "600px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      console.log('after close: ' + dialogResult);
      if (dialogResult) {
        this.deleteAudience(audience);
      }
    });
  }
}