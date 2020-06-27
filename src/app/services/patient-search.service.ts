import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PatientSearchService {

  constructor() { }
  
  searchPatients() {
    return [
      { id: "1", fname: "Sandeep", lname: "Satpute", fullName: "Sandeep Satpute", mobileNumber: 9532165478 },
      { id: "2", fname: "Amit", lname: "Vernekar", fullName: "Amit Vernekar", mobileNumber: 9578946512 },
      { id: "3", fname: "Vipul", lname: "Jadhav", fullName: "Vipul Jadhav", mobileNumber: 9854321003 },
      { id: "4", fname: "Vinod", lname: "", fullName: "Vinod Bhoite", mobileNumber: 9712324565 }
    ]
  }
}
