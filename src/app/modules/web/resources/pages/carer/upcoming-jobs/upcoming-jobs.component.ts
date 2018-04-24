import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CarerJobService } from '../../../../services/carer-job.service';
import { Job } from '../../../../models/job.model';

@Component({
    selector: 'app-upcoming-jobs',
    templateUrl: './upcoming-jobs.component.html',
    styleUrls: ['./upcoming-jobs.component.scss']
})
export class UpcomingJobsComponent implements OnInit
{
    page: number = 1;
    pages: number = 0;
    jobs: Array<Job> = [];
    @Input() paginationDisabled: boolean = false;
    @Output() jobsDue = new EventEmitter<number>();

    constructor(public carerService: CarerJobService) {}

    ngOnInit()
    {
        this.getUpcomingJobs();
    }

    onPageChange(page: number): void
    {
        this.page = page;
        this.getUpcomingJobs();
    }

    private getUpcomingJobs(): void
    {
        this.carerService.getUpcomingJobs(this.page)
            .subscribe((results: { jobs: Array<Job>, pages: number }) => {
                this.jobs = results.jobs;
                this.pages = results.pages;
            });
    }
}
