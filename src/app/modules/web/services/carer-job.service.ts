import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs/Observable';
import {Availability} from '../models/carer-availability/carer-availability';
import {HttpParams} from '@angular/common/http';
import {AvailableJobsResponse} from '../models/available-jobs/available-jobs-response';
import {Job} from '../models/care-home-booking/job';

@Injectable()
export class CarerJobService {
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

    getAvailableJobs(par: any): Observable<any> {
        return this.apiService.getAvailableJobs(this.getAvailableJobsParams(par))
            .map(
                (response: AvailableJobsResponse) => {
                    const jobsArr = [];
                    response.results.forEach((job) => {
                        jobsArr.push(Job.getInstance(job));
                    });
                    return jobsArr;
                }
            );
    }

    private getAvailableJobsParams(par: any): HttpParams {
        const params = new HttpParams();
        const keys = Object.keys(par);
        keys.forEach((key) => {
            if (par[key] !== null) {
                params.set(key, par[key]);
            }
        });
        return params;
    }
}
