import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { createUrlResolverWithoutPackagePrefix } from '@angular/compiler';
import { PatientModel } from '../../models/patient-model';
import { RegistrationService } from '../../services/registration.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  patientRegistrationFormGroup: FormGroup;
  returnUrl: string;
  patientModel: PatientModel = new PatientModel();
  constructor(private formBuilder: FormBuilder, private registrationService: RegistrationService) { }

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
    this.registrationService.saveAndQueue(this.patientModel).subscribe(data=>console.log(data));
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
