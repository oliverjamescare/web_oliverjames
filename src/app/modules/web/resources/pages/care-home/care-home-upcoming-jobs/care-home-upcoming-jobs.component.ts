import { Component, OnInit } from '@angular/core';
import { CareHomeService } from '../../../../services/care-home.service';
import { Job } from '../../../../models/job.model';

@Component({
    selector: 'app-care-home-upcoming-jobs',
    templateUrl: './care-home-upcoming-jobs.component.html',
    styleUrls: ['./care-home-upcoming-jobs.component.scss']
})
export class CareHomeUpcomingJobsComponent implements OnInit
{
    page: number = 1;
    pages: number = 0;
    jobs: Array<Job> = [];

    constructor(private careHomeService: CareHomeService) {}

    ngOnInit()
    {
        this.getUpcomingJobs();
    }

    //pagination handle
    onPageChange(page: number): void
    {
        this.page = page;
        this.getUpcomingJobs();
    }

    //getting data
    private getUpcomingJobs(): void
    {
        this.careHomeService.getJobs(this.page)
            .subscribe((results: { jobs: Array<Job>, pages: number }) => {
                this.jobs = results.jobs;
                this.pages = results.pages;
            });
    }
}
