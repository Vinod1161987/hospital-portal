import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { RequestGetModel } from 'src/app/models/request-get-model';
import { ResponseModel } from 'src/app/models/response-model';
import Constants from '../constants';

@Injectable({
    providedIn: 'root'
})
export class HelperService {
    nodeApiUrl: string;
    constructor() { }

    urlConstructor(endBaseUrlSegement: string, queryStringUrlSegment?: string): string {
        let apiUrl = this.nodeApiUrl;
        // added 2 if condition to avoid url confilict like '/?' if endBaseUrlSegement == ''
        if (endBaseUrlSegement) {
            apiUrl = `${apiUrl}/${endBaseUrlSegement}`;
        }
        if (queryStringUrlSegment) {
            apiUrl = `${apiUrl}${queryStringUrlSegment}`;
        }
        return apiUrl;
    }

    validateGetRequestModel(requestGetModel: RequestGetModel): number {
        let statusCode = 0;
        if (!requestGetModel || !requestGetModel.headers) {
            statusCode = 412;
        }
        return statusCode;
    }

    responseConstructor(response: any): any {
        const responseModel = new ResponseModel();
        if (response != null) {
            responseModel.data = response.data ? response.data : null;
            responseModel.statusCode = response.status ? response.status.code : 200;
            responseModel.statusMessage = response.status ? response.status.message : '';
            responseModel.paging = response.paging ? response.paging : null;
        }
        return responseModel;
    }

    sendInvalidResponse(result: any, statusCode: number, statusMessage: string): Observable<ResponseModel> {
        const responseModel = new ResponseModel();
        responseModel.data = result;
        responseModel.statusCode = statusCode;
        // write switch case to render correct and proper response
        switch (statusCode) {
            case 400:
                responseModel.statusMessage = Constants.badRequestExceptionMessage;
                break;
            case 401:
                responseModel.statusMessage = Constants.unauthorizedExceptionMessage;
                break;
            case 403:
                responseModel.statusMessage = Constants.forbiddenExceptionMessage;
                break;
            case 404:
                responseModel.statusMessage = Constants.notFoundExceptionMessage;
                break;
            case 412:
                responseModel.statusMessage = Constants.preconditionFailedExceptionMessage;
                break;
            case 500:
                responseModel.statusMessage = Constants.internalServerExceptionMessage;
                break;
            default:
                responseModel.statusMessage = Constants.defaultExceptionMessage;
                break;
        }
        responseModel.statusMessage = statusMessage;
        // add logging
        return of(responseModel);
    }

    getHeaders(headers: any) {
      headers = headers.filter(item => item.key !== Constants.authorizationKey);
      let headerList = new HttpHeaders();
      headers.forEach(item => {
          headerList = headerList.set(item.key, item.value);
      });
      headerList = headerList.set(Constants.authorizationKey, `${Constants.bearer} ${sessionStorage.getItem(Constants.accessTokenKey)}`);
      const iscontentTypeExist = headers.filter(item => item.key === Constants.contentTypeValue);
      if (!iscontentTypeExist) {
          headerList = headerList.set(Constants.contentType, Constants.contentTypeValue);
      }
      return headerList;
    }
}
