import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import { Availability } from '../models/carer-availability/carer-availability';
import { HttpParams } from '@angular/common/http';
import { Job } from '../models/job.model';
import { CalendarDay } from '../models/care-home-booking/calendar-day';
import { GetCalendarResponse } from './care-home-booking.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CarerJobService
{
    availability: Availability;
    calendar: CalendarDay[];
    jobDetails: Job;
    currentJobId: string;
    otherJobs: Job[] = [];
    consideredJob = new Subject<Job>();
    pastJobDetails: Job;

    constructor(private apiService: ApiService) {}

    getUpcomingJobs(page: number): Observable<any>
    {
        return this.apiService
            .getUpcomingJobs(page)
            .map(results => { return {  pages: results.pages, jobs: results.results.map(job => new Job(job))} } );
    }

    getAvailabilityCalendar(week: number): Observable<Availability>
    {
        return this.apiService.getAvailabilityCalendar(week);
    }

    updateAvailabilityCalendar(week, availability: Availability): Observable<Availability>
    {
        return this.apiService.updateAvailabilityCalendar(week, availability);
    }

    getAvailableJobs(page: number, sort: string, distance: number | boolean, meet_criteria: boolean): Observable<any>
    {
        const params =  new HttpParams().set('page', page.toString()).set('sort', sort).set('dont_meet_criteria', meet_criteria ? "0" : "1");
        if(distance != false)
            params.set('distance', distance.toString())

        return this.apiService.getAvailableJobs(params)
            .map(results => { return {  pages: results.pages, jobs: results.results.map(job => new Job(job))} } );
    }

    getCarerCalendar(): Observable<any>
    {
        return this.apiService.getCarerCalendar()
            .map(
                (response: GetCalendarResponse) =>
                {
                    console.log('Calendar response', response);
                    const calendar: CalendarDay[] = [];
                    response.calendar.forEach((cal) =>
                    {
                        calendar.push(new CalendarDay(cal.day, cal.jobs));
                    });
                    return calendar;
                }
            );
    }

    getJobDetails(jobId: string): Observable<Job>
    {
        return this.apiService.getJobDetails(jobId)
            .map(result => {
                const job = new Job(result);
                this.consideredJob.next(job);

                return job;
            });
    }

    acceptJob(jobId: string): Observable<any>
    {
        return this.apiService.acceptJob(jobId);
    }

    declineJob(jobId: string): Observable<any>
    {
        return this.apiService.declineJob(jobId);
    }

    withdrawJob(jobId: string, withdrawMessage: string, withdrawPassword: string): Observable<any>
    {
        return this.apiService.withdrawJob(jobId, withdrawMessage, withdrawPassword);
    }

    getOtherJobs(jobId: string): Observable<any>
    {
        return this.apiService.getOtherJobs(jobId)
            .map(results => { return {  pages: results.pages, jobs: results.results.map(job => new Job(job))} } );
    }

    getSubmittedJobs(from: number, to: number, page: number): Observable<any>
    {
        return this.apiService.getCarerSubmittedJobs(from, to, page)
            .map(results => { return {  pages: results.pages, jobs: results.results.map(job => new Job(job))} } );;
    }
}
