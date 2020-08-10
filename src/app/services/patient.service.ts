import { Injectable } from '@angular/core';
import { HttpClientService } from '../helpers/service/http-client.service';
import { PatientModel } from '../models/patient-model';
import { map } from 'rxjs/internal/operators/map';
import Constants from '../helpers/constants';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private httpClientService: HttpClientService) { }
  getPatients() {
    const headers = [];
    return this.httpClientService.get("patient/getPatients", headers);
  }
  save(patientModel: PatientModel) {
    const headers = [];
    patientModel.token = this.getPatientToken();
    patientModel.patientAppointmentDate = new Date()
    return this.httpClientService.post("patient/add", patientModel, headers).pipe(map((res) => {
      localStorage.setItem(Constants.lastTokenNumber_lsKey, patientModel.token.toString());
    }));
  }

  getPatientToken(): number {
    let latestToken = localStorage.getItem(Constants.activeTokenNumber_lsKey);
    if (latestToken) {
      return parseInt(latestToken) + 1;
    }
    else{
      localStorage.setItem(Constants.activeTokenNumber_lsKey, "1");
      return 1;
    }
  }
}
