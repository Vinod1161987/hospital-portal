import { Injectable } from '@angular/core';
import { PatientModel } from '../models/patient-model';
import { HttpClientService } from '../helpers/service/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private httpClientService: HttpClientService) { }
  saveAndQueue(patientModel: PatientModel){
    this.httpClientService.post("", patientModel, {});
  }
}