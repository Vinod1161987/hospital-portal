import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Observable } from 'rxjs';
import { RequestType } from '../enum/request-type';
import { ResponseType } from '../enum/response-type';
import { HelperService } from './http-helper.service';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private readonly httpClient: HttpClient,
    private readonly helperService: HelperService) { }
  
  get(url: string, headersList: any): Observable<any> {
    const httpHeaders = this.helperService.getHeaders(headersList);
    return this.httpClient.get(url, { headers: httpHeaders })
      .pipe(
        map((response: any) => {
          //this.loggerService.info(this.createLogObject(url, headersList, RequestType.GET, response, ResponseType.SUCCESS)).subscribe();
          return this.helperService.responseConstructor(response);
        }),
        catchError((error: Response) => {
          //this.loggerService.error(this.createLogObject(url, headersList, RequestType.GET, error, ResponseType.FAIL)).subscribe();
          return this.helperService.sendInvalidResponse(null, error.status, error.statusText);
        }));
  }

  post(url: string, data: any, headersList: any): Observable<any> {
    console.log(data);
    const httpHeaders = this.helperService.getHeaders(headersList);
    return this.httpClient
      .post(`${environment.apiurl}/${url}`, data,{headers:httpHeaders})
      .pipe(map((response: any) => {
        console.log(response);
         const responseModel = this.helperService.responseConstructor(response);
         return responseModel;
      }),
        catchError((error: Response) => {
          console.log(error);
          //this.loggerService.error(this.createLogObject(url, headersList, RequestType.GET, error, ResponseType.FAIL)).subscribe();
          return this.helperService.sendInvalidResponse(null, error.status, error.statusText);
        }));
  }

  delete(url: string, headersList: any): Observable<any> {
    return this.httpClient
      .delete(url, { headers: this.helperService.getHeaders(headersList) })
      .pipe(map((response: any) => {
        return this.helperService.responseConstructor(response);
      }),
        catchError((error: Response) => {
          return this.helperService.sendInvalidResponse(null, error.status, error.statusText);
        }));
  }

  put(url: string, data: any, headersList: any): Observable<any> {
    return this.httpClient
      .put(url, null, { headers: this.helperService.getHeaders(headersList) })
      .pipe(map((response: any) => {
        return this.helperService.responseConstructor(response);
      }),
        catchError((error: Response) => {
          return this.helperService.sendInvalidResponse(null, error.status, error.statusText);
        }));
  }
  
}
