import { Component, OnInit } from '@angular/core';
import { PatientModel } from 'src/app/models/patient-model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
  patientList: PatientModel[];
  constructor(private formBuilder: FormBuilder, private patientService: PatientService) { }

  ngOnInit() {
    // Uncomment below line when DB connection is not working
    this.patientList = this.getPatientDummyData();
    //this.getPatients();
  }
  getPatients() {
    this.patientService.getPatients().subscribe(response => {
      if (response.statusCode == 200) {
        this.patientList = response.data.Patients
      }
    }
    );
  }
  getNewPatient(patient: PatientModel) {
    this.patientList.unshift(patient);
    this.patientList = [...this.patientList]
  }

  getPatientDummyData() {
    return [
      { id: "1", firstName: "Sandeep", middleName: "H", lastName: "Satpute", address: "Gondhale Nagar, Hadapsar", mobileNo: 9561809294, emergencyContactNo: 131321321, age: 33, gender: "", token: 0, patientAppointmentDate: new Date() },
      { id: "2", firstName: "Amit", middleName: "", lastName: "Vernekar", address: "Tukai Darshan, Hadapsar", mobileNo: 987456123, emergencyContactNo: 131321321, age: 33, gender: "", token: 0, patientAppointmentDate: new Date() },
      { id: "3", firstName: "Vipul", middleName: "", lastName: "Jadhav", address: "Katraj", mobileNo: 976685447, emergencyContactNo: 131321321, age: 33, gender: "", token: 0, patientAppointmentDate: new Date() }];
  }
}