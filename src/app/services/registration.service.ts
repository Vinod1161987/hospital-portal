import { Injectable } from '@angular/core';
import { PatientModel } from '../models/patient-model';
import { HttpClientService } from '../helpers/service/http-client.service';
import Constants from '../helpers/constants';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private httpClientService: HttpClientService) { }
  saveAndQueue(patientModel: PatientModel){
    const headers = [];
    return  this.httpClientService.post("user/registration", patientModel, headers);
  }
}
