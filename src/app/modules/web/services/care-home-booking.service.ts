import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {CalendarDay} from '../models/calendar-day';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class CareHomeBookingService {
    calendar: CalendarDay[] = [];

    constructor(private apiService: ApiService) {
    }

    getData(): Observable<any> {
        return this.apiService.getCalendarData();
    }
}
