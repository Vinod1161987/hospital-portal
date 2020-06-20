import { PagingResponse } from './pagination-model';

export class ResponseModel {
    data: any;
    statusCode: number;
    statusMessage: string;
    paging: PagingResponse;
}