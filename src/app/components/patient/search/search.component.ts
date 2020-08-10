import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PatientSearchService } from '../../../services/patient-search.service';
import { PatientModel } from 'src/app/models/patient-model';
import { CloneDeepWithCustomizer } from 'lodash';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  patientSearchControl = new FormControl();
  @Input() patients: PatientModel[];
  searchPatientList: PatientModel[] = [];
  
  constructor(private patientSearchService: PatientSearchService) {    
   }

  ngOnInit() {
    Object.assign(this.searchPatientList, this.patients);
    this.searchPatients();
  }

  searchPatients(){
     //this.patients = this.patientSearchService.searchPatients();
     
     return this.searchPatientList;
  }
}
