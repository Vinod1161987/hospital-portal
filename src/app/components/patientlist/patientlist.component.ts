import { Component, OnInit, ViewChild } from '@angular/core';
import { PatientlistService, Patient } from 'src/app/services/patientlist.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-patientlist',
  templateUrl: './patientlist.component.html',
  styleUrls: ['./patientlist.component.scss']
})
export class PatientlistComponent implements OnInit {
  patients: MatTableDataSource<Patient>;
  displayedColumns: string[] = ['fullName', 'mobileNumber', 'token', 'date', 'actions'];
  // get refereence to paginator
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private patientlistService: PatientlistService) {
    this.getPatients();
  }

  ngOnInit() {
    this.patients.paginator = this.paginator;
  }

  getPatients() {
    this.patients = new MatTableDataSource(this.patientlistService.getPatients());
  }
}
