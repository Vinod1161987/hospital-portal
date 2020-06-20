import { RequestHeaderModel } from './request-header-model';

export class RequestGetModel {
    baseUrlEndSegement: string;
    queryStringUrlSegment: string;
    headers: RequestHeaderModel[];
}