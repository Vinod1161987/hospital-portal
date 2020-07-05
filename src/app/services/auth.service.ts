import { Injectable } from '@angular/core';
import { LoginResponse } from '../models/login-response';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClientService } from '../helpers/service/http-client.service';
import { map } from 'rxjs/internal/operators/map';
import { JAN } from '@angular/material/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private loggedInUserSubject: BehaviorSubject<LoginResponse>;
private loggedInUser:  Observable<LoginResponse>;
  constructor(private httpClientService: HttpClientService) {
    this.loggedInUserSubject = new BehaviorSubject<LoginResponse>(JSON.parse(localStorage.getItem("user")));
    this.loggedInUser = this.loggedInUserSubject.asObservable();
   }

   public getLoggedInUser(): LoginResponse {
      return this.loggedInUserSubject.value;
   }

   login(username:string, password: string){
     const headers = [];
     headers.push({key:'credential',value:username})
     headers.push({key:'credential-value',value:password})
     return this.httpClientService.post("users/authenticate",{},headers)
     .pipe(
       map(res=>
        {
          if(res.status==="200")
          {
            localStorage.setItem("accessToken",JSON.stringify(res.data.accessToken));
            localStorage.setItem("loggedInUser",JSON.stringify(res.data));
            this.loggedInUserSubject.next(res.data)
          }
          return res;
       })
     );
     // call http post method - to authorize user
     // response - set local storage item
     // set BehaviourSubject = reponse object
   }
   logout(){
     localStorage.removeItem("user");
     this.loggedInUserSubject.next(null);
   }
}
