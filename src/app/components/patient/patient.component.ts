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
  patientRegistrationFormGroup: FormGroup;
  returnUrl: string;
  patientModel: PatientModel = new PatientModel();
  constructor(private formBuilder: FormBuilder, private patientService: PatientService) { }

  ngOnInit() {
    this.patientRegistrationFormGroup = this.formBuilder.group({
      "firstName": ['', Validators.required],
      "middleName": [''],
      "lastName": ['', Validators.required],
      "gender": ['Male'],
      "age": ['', Validators.required],
      "mobileNo": ['', Validators.required],
      "emergencyContactNo": [''],
      "address": ['', [Validators.required, Validators.maxLength(200)]],
    });
  }

  //Short way of accessing form controls
  get rf() { return this.patientRegistrationFormGroup.controls; }

  submit() {
    console.log("called..");
    this.patientModel = <PatientModel>this.patientRegistrationFormGroup.value;
    this.patientService.save(this.patientModel).subscribe(data => { 
      console.log(data); 
    });
  }

  errorHandler(controlName: string, error: string) {
    return this.patientRegistrationFormGroup.controls[controlName].hasError(error);
  }

  // Reset form values
  reset() {
    this.patientRegistrationFormGroup.reset();
    this.rf.gender.setValue('Male');
  }
}