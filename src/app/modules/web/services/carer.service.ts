import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class CarerService {
    constructor(private apiService: ApiService) {
    }

    getNotifications(page: number): Observable<any> {
        return this.apiService.getCarerNotifications(page);
    }
}
