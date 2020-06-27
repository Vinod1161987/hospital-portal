import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PatientSearchService } from '../../services/patient-search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  patientSearchControl = new FormControl();
  patients: any;
  constructor(private patientSearchService: PatientSearchService) {    
   }

  ngOnInit() {
    this.searchPatients();
  }

  searchPatients(){
     this.patients = this.patientSearchService.searchPatients();
     return this.patients;
  }
}
