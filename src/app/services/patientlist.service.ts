import { Injectable } from '@angular/core';
import { HttpClientService } from '../helpers/service/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class PatientlistService {

  constructor(private httpClientService: HttpClientService) { }
  getPatients() {
    const headers = [];
    return this.httpClientService.get("patient/getPatients", headers);
  }
}
