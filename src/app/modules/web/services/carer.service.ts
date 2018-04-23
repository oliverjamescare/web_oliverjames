import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs/Observable';
import { Notification } from '../models/notification.model';

@Injectable()
export class CarerService {
    constructor(private apiService: ApiService) {
    }

    getNotifications(page: number): Observable<any>
    {
        return this.apiService
            .getCarerNotifications(page)
            .map(results => { return {  pages: results.pages, notifications: results.results.map(notification => new Notification(notification))} } );
    }

    getHomeScreen(): Observable<any> {
        return this.apiService.getCarerHomeScreen();
    }
}
