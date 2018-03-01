import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs/Observable';
import {Job} from '../models/care-home-booking/job';
import {CalendarDay} from '../models/care-home-booking/calendar-day';
import {BookingForm} from '../models/care-home-booking/booking-form';
import {PreBookedJob} from '../models/care-home-booking/pre-booked-job';
import {Subject} from 'rxjs/Subject';
import {Carer} from '../models/care-home-booking/Carer';
import {GeneralGuidance} from '../models/care-home-booking/general-guidance';
import {FakeApiService} from './fake-api.service';

@Injectable()
export class CareHomeBookingService {
    calendar: CalendarDay[];
    preBookedJobs: PreBookedJob[] = [];
    addedBooking = new Subject<PreBookedJob>();
    priorityCarers: Carer[] = [];
    generalGuidance: GeneralGuidance;
    generalGuidanceForm: GeneralGuidance;
    florPlanFile: File = null;

    constructor(private apiService: ApiService,
                private fakeApiService: FakeApiService) {
        this.loadPreBookedJobsFromSession();
    }

    getCalendar(): Observable<CalendarDay[]> {
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

    bookJob(bookingForm: BookingForm, index: number): void {
        const bookedJob: PreBookedJob = PreBookedJob.getInstanceFromForm(bookingForm, index);
        this.preBookedJobs.push(bookedJob);
        this.addedBooking.next(bookedJob);
        sessionStorage.setItem('preBookedJobs', JSON.stringify(this.preBookedJobs));
    }

    searchForPriority(searchString: string): Observable<any> {
        return this.fakeApiService.searchForPriorityUsersFake(searchString)
            .map(
                (response: SearchForPriorityResponse) => {
                    return response.carers;
                }
            );
    }

    emitPreBookedJobs(): void {
        this.preBookedJobs.forEach((job) => {
            this.addedBooking.next(job);
        });
    }

    cheekCarersToContact(): Observable<any> {
        console.log('Parse pre booked jobs', this.parsePreBookedJobs());
        return this.apiService.checkCarersToContact(this.parsePreBookedJobs())
            .map((response: CheckCarersToContactResponse) => {
                const preBookedJobs: PreBookedJob[] = [];
                response.jobs.forEach((job) => {
                    preBookedJobs.push(PreBookedJob.getInstanceFromResponse(job));
                });
                return preBookedJobs;
            });
    }

    removePreBookedJob(index: number): void {
        this.preBookedJobs.splice(index, 1);
        sessionStorage.setItem('preBookedJobs', JSON.stringify(this.preBookedJobs));
    }

    getGuidanceInfo(): Observable<any> {
        return this.apiService.getUserProfile()
            .map(
                userProfile => {
                    console.log('userProfile', userProfile);
                    return GeneralGuidance.getInstanceFromResponse(userProfile.care_home.general_guidance);
                }
            );
    }

    bookJobs(): Observable<any> {
        return this.apiService.bookJobs(this.getAddBookBodyForRequest());
    }

    clearAfterBooking(): void {
        this.preBookedJobs = [];
        this.priorityCarers = [];
        sessionStorage.removeItem('preBookedJobs');
    }

    private parsePreBookedJobs(): string {
        return JSON.stringify(this.preBookedJobs);
    }

    private loadPreBookedJobsFromSession(): void {
        const preBookedJobs: PreBookedJob[] = JSON.parse(sessionStorage.getItem('preBookedJobs'));
        if (preBookedJobs) {
            preBookedJobs.forEach((job) => {
                this.preBookedJobs.push(PreBookedJob.getInstanceFromResponse(job));
            });
        }
    }

    private getAddBookBodyForRequest(): FormData {
        console.log('guidance form', this.generalGuidanceForm);
        console.log('file', this.florPlanFile);
        const formData: FormData = new FormData();
        if (this.florPlanFile !== null) {
            formData.append('floor_plan', this.florPlanFile);
        }
        formData.append('jobs', this.parsePreBookedJobs());
        formData.append('parking', this.generalGuidanceForm.parking);
        formData.append('notes_for_carers', this.generalGuidanceForm.notes_for_carers);
        formData.append('emergency_guidance', this.generalGuidanceForm.emergency_guidance);
        formData.append('report_contact', this.generalGuidanceForm.report_contact);
        formData.append('superior_contact', this.generalGuidanceForm.superior_contact);
        return formData;
    }
}

export interface GetCalendarResponse {
    calendar: ApiCalendar[];
}

export interface ApiCalendar {
    day: string;
    jobs: Job[];
}

export interface SearchForPriorityResponse {
    carers: Carer[];
}

export interface CheckCarersToContactResponse {
    jobs: PreBookedJob[];
}
