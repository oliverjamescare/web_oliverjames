import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs/Observable';
import {Job} from '../models/care-home-booking/job';
import {CalendarDay} from '../models/care-home-booking/calendar-day';

@Injectable()
export class CareHomeBookingService {

    constructor(private apiService: ApiService) {
    }

    getCalendar(): Observable<any> {
        return this.apiService.getCalendarData()
            .map(
                (response: GetCalendarResponse) => {
                    const calendar: CalendarDay[] = [];
                    response.calendar.forEach((cal) => {
                        calendar.push(new CalendarDay(cal.day, cal.jobs));
                    });
                    return calendar;
                }
            );
    }
}

export interface GetCalendarResponse {
    calendar: ApiCalendar[];
}

export interface ApiCalendar {
    day: string;
    jobs: Job[];
}
