import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs/Observable';
import {Availability} from '../models/carer-availability/carer-availability';

@Injectable()
export class CarerService {
    availability: Availability;

    constructor(private apiService: ApiService) {
    }

    getUpcomingJobs(page: number): Observable<any> {
        return this.apiService.getUpcomingJobs(page)
            .map(response => response);
    }

    getAvailabilityCalendar(week: number): Observable<Availability> {
        return this.apiService.getAvailabilityCalendar(week);
    }

    updateAvailabilityCalendar(week, availability: Availability): Observable<Availability> {
        return this.apiService.updateAvailabilityCalendar(week, availability);
    }
}
