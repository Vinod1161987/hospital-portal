import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private readonly httpClient: HttpClient) { }
  get(): Observable<any>{ 
    return this.httpClient.get("");    
  }

  post(entity:any): Observable<any>{
    // return this.httpClient.post('../mock-data/login-response',[]).pipe(map(res => res.json()))
    //                     .do(data => console.log(data));
    if(entity.username == 'Vinod')
      return Observable.create(observer => {
        observer.next('{"id": 1,"tokenType": "Bearer","accessToken": "ewogICAgInN1YiI6IDEsCiAgICAiZmlyc3ROYW1lIjogIlZpbm9kIiwKICAgICJsYXN0TmFtZSI6ICJCaG9pdGUiLAogICAgInVzZXJUeXBlIjogIkRvY3RvciIKfQ==","expiredIn": "3600"}');
      });
      else{
        return Observable.create(observer => {
          observer.next(null);
        });
      }
  }

  put(): Observable<any>{
    return this.httpClient.put("",{});
  }

  delete(): Observable<any>{
    return this.httpClient.delete("");
  }
}
