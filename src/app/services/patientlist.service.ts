import { Injectable } from '@angular/core';
export interface Patient {
  fullName: string;  
  mobileNumber: number;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class PatientlistService {

  constructor() { }
  getPatients() {
    const patientList: Patient[] = [    
      { fullName: "Sandeep Satpute", mobileNumber: 9532165478, date:"25 Jun" },
      { fullName: "Amit Vernekar", mobileNumber: 9578946512, date:"25 Jun" },
      { fullName: "Vipul Jadhav", mobileNumber: 9854321003, date:"27 Jun" },
      { fullName: "Vinod Bhoite", mobileNumber: 9712324565, date:"27 Jun" }
    ]
    return patientList;
  }
}
