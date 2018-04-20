import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import 'rxjs/Rx';

import { AuthService } from './auth.service';
import { FormGroup } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Job } from '../models/job.model';

@Injectable()
export class CareHomeService
{
    public address;
    public addressForm: FormGroup;

    // job
    jobDetails: any;
    detailsLoaded = new Subject();
    pastJobDetails;

    constructor(private apiService: ApiService, private authService: AuthService) {}

    registerCareHome(careHomeFormObject: Object)
    {
        this.addressForm = null;
        return this.apiService.register(careHomeFormObject);
    }

    loginCareHome(email: string, password: string)
    {
        const body = { email, password, 'userType': 'care_home' };
        return this.apiService
            .login(body)
            .map(result =>
            {

                // care home login handle
                const user = new User(result['user']);
                this.authService.login(user);
                return result;
            });
    }

    checkCarersNearby(addressObject: Object)
    {
        const params = new HttpParams()
            .set('postal_code', addressObject['postal_code'])
            .set('address_line_1', addressObject['address_line_1'])
            .set('address_line_2', addressObject['address_line_2'])
            .set('city', addressObject['city']);

        return this.apiService.checkCarersNearPoint(params);
    }

    addCareHomeToWaitingList(waitingFormObject: Object)
    {
        return this.apiService.addCareHomeToWaitingList(waitingFormObject);
    }

    getJobs(page): Observable<{ jobs: Array<Job>, pages: number }>
    {
        return this.apiService.getCareHomeJobs(page).map(this.parseJobsResults);
    }

    getJobDetails(jobId: string): Observable<any>
    {
        return this.apiService.getJobDetails(jobId)
            .map(
                response =>
                {
                    this.jobDetails = response;
                    this.detailsLoaded.next();
                    return response;
                }
            );
    }

    editJob(jobId: string, formData: FormData): Observable<any>
    {
        return this.apiService.editJob(jobId, formData);
    }

    cancelJob(jobId: string): Observable<any>
    {
        return this.apiService.cancelJob(jobId);
    }

    getPendingReviews(page: number): Observable<any>
    {
        return this.apiService.getPendingReviews(page);
    }

    reviewJobCarer(jobId: string, rate: number, description: string): Observable<any>
    {
        return this.apiService.reviewJobCarer(jobId, rate, description);
    }

    addCarerToBlocked(carerId: string): Observable<any>
    {
        return this.apiService.addCarerToBlocked(carerId);
    }

    getCareHomePastJobs(from: number, to: number, page: number): Observable<{ jobs: Array<Job>, pages: number }>
    {
        return this.apiService.getCareHomePastJobs(from, to, page).map(this.parseJobsResults);
    }

    getPastJobDetails(jobId: string): Observable<any>
    {
        return this.apiService.getPastJobsDetails(jobId);
    }

    challengeJobPayment(jobId: string, description: string): Observable<any>
    {
        return this.apiService.challengeJobPayment(jobId, description);
    }

    private parseJobsResults(response: { results: Array<Job>, pages: number }) : { jobs: Array<Job>, pages: number }
    {
        const res: { jobs: Array<Job>, pages: number } = {
            jobs: Array.isArray(response.results) ? response.results.map(job => new Job(job)) : [],
            pages: response.pages || 0
        };

        return res;
    }
}
