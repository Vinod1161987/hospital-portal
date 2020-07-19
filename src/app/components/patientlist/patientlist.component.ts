import { Component, OnInit, ViewChild } from '@angular/core';
import { PatientlistService } from 'src/app/services/patientlist.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PatientModel } from 'src/app/models/patient-model';

@Component({
  selector: 'app-patientlist',
  templateUrl: './patientlist.component.html',
  styleUrls: ['./patientlist.component.scss']
})
export class PatientlistComponent implements OnInit {
  patients: MatTableDataSource<PatientModel>;
  displayedColumns: string[] = ['fullName', 'mobileNo', 'token', 'date', 'actions'];
  // get refereence to paginator
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private patientlistService: PatientlistService) {
  
  }

  ngOnInit() {
    this.getPatients();
  }

  getPatients() {
    this.patientlistService.getPatients().subscribe(response=>
      {
        if (response.statusCode == 200) {
        this.patients = new MatTableDataSource(response.data.Patients);
        this.patients.paginator = this.paginator;
        }
      }
     );
  }
}
