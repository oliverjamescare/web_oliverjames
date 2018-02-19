import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs/Observable';
import {Job} from '../models/care-home-booking/job';
import {CalendarDay} from '../models/care-home-booking/calendar-day';
import {BookingForm} from '../models/care-home-booking/booking-form';
import {PreBookedJob} from '../models/care-home-booking/pre-booked-job';

@Injectable()
export class CareHomeBookingService {
    calendar: CalendarDay[];

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

    bookJob(bookingForm: BookingForm): void {
        this.calendar[bookingForm.start_date].preBookedJobs.push(new PreBookedJob(bookingForm));
        console.log('booking service calendar', this.calendar);
    }
}

export interface GetCalendarResponse {
    calendar: ApiCalendar[];
}

export interface ApiCalendar {
    day: string;
    jobs: Job[];
}
