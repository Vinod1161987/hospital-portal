import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PatientModel } from 'src/app/models/patient-model';
import { FormControl } from '@angular/forms';
import * as _ from 'lodash'
import { UtilityService } from '../../../helpers/service/utility.service';

@Component({
  selector: 'app-patientlist',
  templateUrl: './patientlist.component.html',
  styleUrls: ['./patientlist.component.scss']
})
export class PatientlistComponent implements OnInit {
  patients: MatTableDataSource<PatientModel>;
  displayedColumns: string[] = ['fullName', 'mobileNo', 'actions'];

  searchValue: string;
  // get refereence to paginator
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  // Search
  patientSearchControl = new FormControl();
  @Input() patientList: PatientModel[];
  searchPatientList: PatientModel[] = [];
  constructor(private utilityService:UtilityService) {
  }

  ngOnInit() {
    this.getPatients();
  }

  getPatients() {
    this.searchPatientList = _.cloneDeep(this.patientList);
    this.patients = new MatTableDataSource(this.patientList);
    this.patients.paginator = this.paginator;
  }

  searchPatient(searchText: string) {
    this.searchPatientList = this.patientList.filter(p => {
      if (this.utilityService.compareContainStringWithoutCase(p.firstName, searchText) > -1 ||
        this.utilityService.compareContainStringWithoutCase(p.middleName, searchText) > -1 ||
        this.utilityService.compareContainStringWithoutCase(p.lastName, searchText) > -1 ||
        this.utilityService.compareContainStringWithoutCase(p.mobileNo.toString(), searchText) > -1) {
        return p;
      }
    });
    this.patients = new MatTableDataSource(this.searchPatientList);
  }
  
  clearSearch() {
    this.searchValue = '';
    this.patients = new MatTableDataSource(this.patientList);
    this.searchPatientList = _.cloneDeep(this.patientList);
  }
}
