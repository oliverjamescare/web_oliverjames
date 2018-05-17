import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs/Observable';
import {JobListResponse} from '../models/response/job-list-response';
import { FormArray, FormGroup } from '@angular/forms';

@Injectable()
export class JobsService {
    constructor(private apiService: ApiService) {
    }

    getJobsList(search: string, jobStatus: string, reviewStatus: string, manualBooking: string, page: number): Observable<JobListResponse> {
        return this.apiService.getJobs(search, jobStatus, reviewStatus, manualBooking, page);
    }

    getJobDetails(jobId: string): Observable<any> {
        return this.apiService.getJobDetails(jobId);
    }

    updateJob(jobId: string, body: FormData): Observable<any> {
        return this.apiService.updateJob(jobId, body);
    }

    cancelJob(jobId: string, waiveCharges: string): Observable<any> {
        return this.apiService.cancelJob(jobId, waiveCharges);
    }

    resolveChallange(jobId: string, status: string, reason: string): Observable<any> {
        return this.apiService.resolveChallange(jobId, status, reason);
    }

    retryJobPayment(jobId: string): Observable<any> {
        return this.apiService.retryJobPayment(jobId);
    }

    addJobs(form: FormGroup, careHomeId: string, floorPlan: File)
    {
        const formData = new FormData();
        const jobs = [];
        (<FormArray>form.get("jobs")).value.forEach(jobForm => {
            jobs.push({ start_date: jobForm.start_date.getTime(), end_date: jobForm.end_date.getTime(), role: jobForm.role, notes: jobForm.notes });
        });

        formData.append("jobs", JSON.stringify(jobs));
        formData.append("gender_preference", form.get("gender_preference").value);
        formData.append("parking", form.get("parking").value);
        formData.append("notes_for_carers", form.get("notes_for_carers").value);
        formData.append("emergency_guidance", form.get("emergency_guidance").value);
        formData.append("report_contact", form.get("report_contact").value);
        formData.append("superior_contact", form.get("superior_contact").value);

        if(floorPlan)
            formData.append("floor_plan", floorPlan);

        return this.apiService.addJobs(formData, careHomeId)
    }
}
