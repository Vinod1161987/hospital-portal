import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  title = 'HospitalPortal';
  customerName = "VIGHNESHWAR Hospital";
  
  constructor(){}
  currentTime = new Observable<string>(observer => {setInterval(() => observer.next(new Date().toString()), 1000)});
  // ngOnInit(){
  //  setInterval(function(){ this.currentTime = new Date().toString(); }, 3000);
  // }
}
