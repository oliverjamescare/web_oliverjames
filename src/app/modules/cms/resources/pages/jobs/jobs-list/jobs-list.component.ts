import {Component, OnInit} from '@angular/core';
import {JobsService} from '../../../../services/jobs.service';
import {JobListObject} from '../../../../models/response/job-list-object';
import {JobListResponse} from '../../../../models/response/job-list-response';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-jobs-list',
    templateUrl: './jobs-list.component.html',
    styleUrls: ['./jobs-list.component.scss']
})
export class JobsListComponent implements OnInit
{
    jobs: JobListObject[] = [];
    page: number = 1;
    pages: number = 0;
    form: FormGroup;

    constructor(private jobsService: JobsService) {}

    ngOnInit()
    {
        //form and form filters
        this.createForm();
        this.form.get('search').valueChanges.debounceTime(400).subscribe(() => {
            this.page = 1;
            this.getJobs()
        });
        this.form.get('job_status_filter').valueChanges.subscribe(() => {
            this.page = 1;
            this.getJobs()
        });
        this.form.get('review_status_filter').valueChanges.subscribe(() => {
            this.page = 1;
            this.getJobs()
        });
        this.form.get('manual_booking_filter').valueChanges.subscribe(() => {
            this.page = 1;
            this.getJobs()
        });

        //getting first page of jobs
        this.getJobs();
    }

    onPageChange(page: number): void
    {
        this.page = page;
        this.getJobs();
    }

    private getJobs(): void
    {
        this.jobsService.getJobsList(
                this.form.get("search").value,
                this.form.get("job_status_filter").value,
                this.form.get("review_status_filter").value,
                this.form.get("manual_booking_filter").value,
                this.page
            )
            .subscribe(
                (response: JobListResponse) => {
                    this.jobs = response.results;
                    this.pages = response.pages;
                }
            );
    }

    private createForm(): void
    {
        this.form = new FormGroup({
            'job_status_filter': new FormControl('ALL'),
            'review_status_filter': new FormControl('ALL'),
            'manual_booking_filter': new FormControl('ALL'),
            'search': new FormControl('')
        });
    }
}
