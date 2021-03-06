import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { PatientModel } from '../../../models/patient-model';
import { PatientService } from '../../../services/patient.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss']
})
export class AddPatientComponent implements OnInit {

  patientFormGroup: FormGroup;
  returnUrl: string;
  @Output() newPatientChanges = new EventEmitter<PatientModel>();
  patientModel: PatientModel = new PatientModel();
  constructor(private formBuilder: FormBuilder, private patientService: PatientService) { }

  ngOnInit() {
    this.patientFormGroup = this.formBuilder.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      gender: ['Male'],
      age: ['', Validators.required],
      mobileNo: ['', Validators.required],
      emergencyContactNo: [''],
      address: ['', [Validators.required, Validators.maxLength(200)]],
    });
  }

  //Short way of accessing form controls
  get rf() { return this.patientFormGroup.controls; }

  submit() {
    if (this.patientFormGroup.invalid) {
      return;
    }
    this.patientModel = <PatientModel>this.patientFormGroup.value;
    this.newPatientChanges.emit(this.patientModel);
    this.patientService.save(this.patientModel).subscribe(data => {
    this.newPatientChanges.emit(this.patientModel);
      console.log(data);
    });
  }

  errorHandler(controlName: string, error: string) {
    return this.patientFormGroup.controls[controlName].hasError(error);
  }

  // Reset form values
  reset() {
    this.patientFormGroup.reset();
    this.rf.gender.setValue('Male');
  }
}
