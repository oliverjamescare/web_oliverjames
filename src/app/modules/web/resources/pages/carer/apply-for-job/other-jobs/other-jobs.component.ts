import { Component, Input, OnInit } from '@angular/core';
import { CarerJobService } from '../../../../../services/carer-job.service';
import { Job } from '../../../../../models/job.model';

@Component({
    selector: 'app-other-jobs',
    templateUrl: './other-jobs.component.html',
    styleUrls: ['./other-jobs.component.scss']
})
export class OtherJobsComponent implements OnInit
{
    loading = true;
    jobs: Array<Job> = [];
    @Input() jobId: string;

    constructor(private carerJobService: CarerJobService) {}

    ngOnInit(): void
    {
        this.getOtherJobs();
    }

    private getOtherJobs(): void
    {
        this.loading = true;
        this.carerJobService.getOtherJobs(this.jobId)
            .subscribe((results: { jobs: Array<Job>, pages: number }) => {
                this.jobs = results.jobs;
            });
    }
}
