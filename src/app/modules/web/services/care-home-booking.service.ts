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
    removedBooking = new Subject<PreBookedJob>();
    priorityCarers: Carer[] = [];
    generalGuidance: GeneralGuidance;
    generalGuidanceForm: GeneralGuidance = null;
    florPlanFile: File = null;

    card_number: any;
    jobsFieldsBeforeSubmit: any = {};
    genderPreference: number;

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

    bookJob(bookingForm: BookingForm, index: number): void
    {
        const bookedJob: PreBookedJob = PreBookedJob.getInstanceFromForm(bookingForm, index);

        this.preBookedJobs.push(bookedJob);
        this.addedBooking.next(bookedJob);
        sessionStorage.setItem('preBookedJobs', JSON.stringify(this.preBookedJobs));
    }

    searchForPriority(searchString: string): Observable<any> {
        return this.apiService.searchForPriorityUsers(searchString)
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
        return this.apiService.checkCarersToContact(this.parsePreBookedJobs())
            .map((response: CheckCarersToContactResponse) => {
                const preBookedJobs: PreBookedJob[] = [];
                response.jobs.forEach((job) => {
                    preBookedJobs.push(PreBookedJob.getInstanceFromResponse(job));
                });
                return preBookedJobs;
            });
    }

    removePreBookedJob(index: number): void
    {
        this.removedBooking.next(this.preBookedJobs[index]);
        this.preBookedJobs.splice(index, 1);
        sessionStorage.setItem('preBookedJobs', JSON.stringify(this.preBookedJobs));
    }

    getGuidanceInfo(): Observable<any> {
        return this.apiService.getUserProfile()
            .map(
                userProfile => {
                    // fake until api passs stripe token
                    this.card_number = userProfile.care_home.payment_system.card_number;
                    return GeneralGuidance.getInstanceFromResponse(userProfile.care_home.general_guidance);
                }
            );
    }

    bookJobs(): Observable<any> {
        return this.apiService.bookJobs(this.getAddBookBodyForRequest());
    }

    clearAfterBooking(): void
    {
        this.preBookedJobs = [];
        this.priorityCarers = [];
        sessionStorage.removeItem('preBookedJobs');
    }

    getSubmitedJobsNotifications(group: string, page: number): Observable<any> {
        return this.apiService.getSubmittedJobNotifications(group, page);
    }

    cancelCarerNotification(group: string, carerId: string): Observable<any> {
        return this.apiService.cancelCarerNotification(group, carerId);
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

    private getAddBookBodyForRequest(): FormData
    {
        const formData: FormData = new FormData();

        formData.append('jobs', this.parsePreBookedJobs());

        //general guidance
        if (this.florPlanFile !== null)
            formData.append('floor_plan', this.florPlanFile);

        if(this.generalGuidanceForm.parking)
            formData.append('parking', this.generalGuidanceForm.parking);
        if(this.generalGuidanceForm.notes_for_carers)
            formData.append('notes_for_carers', this.generalGuidanceForm.notes_for_carers);
        if(this.generalGuidanceForm.emergency_guidance)
            formData.append('emergency_guidance', this.generalGuidanceForm.emergency_guidance);
        if(this.generalGuidanceForm.report_contact)
            formData.append('report_contact', this.generalGuidanceForm.report_contact);
        if(this.generalGuidanceForm.superior_contact)
            formData.append('superior_contact', this.generalGuidanceForm.superior_contact);
            formData.append('gender_preference', this.prepareGenderPreference());
        return formData;
    }

    public fillJobsFieldsBeforeSubmit(): void {
    if (this.florPlanFile !== null)
        this.jobsFieldsBeforeSubmit.floor_plan = this.florPlanFile.name;
    if(this.generalGuidanceForm.parking)
        this.jobsFieldsBeforeSubmit.parking =  this.generalGuidanceForm.parking;
    if(this.generalGuidanceForm.notes_for_carers)
        this.jobsFieldsBeforeSubmit.notes_for_carers =  this.generalGuidanceForm.notes_for_carers;
    if(this.generalGuidanceForm.emergency_guidance)
        this.jobsFieldsBeforeSubmit.emergency_guidance =  this.generalGuidanceForm.emergency_guidance;
    if(this.generalGuidanceForm.report_contact)
        this.jobsFieldsBeforeSubmit.report_contact =  this.generalGuidanceForm.report_contact;
    if(this.generalGuidanceForm.superior_contact)
        this.jobsFieldsBeforeSubmit.superior_contact =  this.generalGuidanceForm.superior_contact;



}

    private prepareGenderPreference(): string {
        switch (this.genderPreference) {
            case 1:
                return 'Male';
            case 2:
                return 'Female';
            default:
                return 'No preference';
        }
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
