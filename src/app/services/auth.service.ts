import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from '../models/login-response';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClientService } from '../helpers/service/http-client.service';
import { map } from 'rxjs/internal/operators/map';

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
     var user = {
       username: username,
       password: password
     }
    return this.httpClientService.post(user).pipe(
      map(res => {
        res.JSON(); console.log(res.JSON())}));
     // call http post method - to authorize user
     // response - set local storage item
     // set BehaviourSubject = reponse object
   }
   logout(){
     localStorage.removeItem("user");
     this.loggedInUserSubject.next(null);
   }
}
