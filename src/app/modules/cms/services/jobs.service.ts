import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs/Observable';
import {JobListResponse} from '../models/response/job-list-response';

@Injectable()
export class JobsService {
    constructor(private apiService: ApiService) {
    }

    getJobsList(search: string, jobStatus: string, reviewStatus: string, manualBooking: string, page: number): Observable<JobListResponse> {
        return this.apiService.getJobs(search, jobStatus, reviewStatus, manualBooking, page);
    }
}