import { Injectable } from '@angular/core';
import { HttpClientService } from '../helpers/service/http-client.service';
import { PatientModel } from '../models/patient-model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private httpClientService: HttpClientService) { }
  save(patientModel: PatientModel){
    const headers = [];
    return  this.httpClientService.post("user/registration", patientModel, headers);
  }
}
