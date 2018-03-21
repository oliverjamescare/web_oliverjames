import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs/Observable';
import {CarersListResponse} from '../models/response/carers-list-response';
import {CarerDetailsResponse} from '../models/response/carer-details-response';

@Injectable()
export class CarersService {
    constructor(private apiService: ApiService) {
    }

    getCarersList(search: string = '', sort: string, page: number): Observable<CarersListResponse> {
        return this.apiService.getCarersList(search, sort, page);
    }

    getCarerDetails(id: string): Observable<CarerDetailsResponse> {
        return this.apiService.getCarerDetails(id);
    }
}
