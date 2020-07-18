import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  title = 'HospitalPortal';
  customerName = "VIGHNESHWAR Hospital";
  
  constructor(private authService: AuthService, private router: Router){}
  currentTime = new Observable<string>(observer => {setInterval(() => observer.next(new Date().toString()), 1000)});
  // ngOnInit(){
  //  setInterval(function(){ this.currentTime = new Date().toString(); }, 3000);
  // }

  logout(){
    // remove user from local storage and set current user to null
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
