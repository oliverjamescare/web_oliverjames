import { Component, OnInit } from '@angular/core';
import { Job } from '../../../../models/job.model';
import { ActivatedRoute } from '@angular/router';
import { CarerJobService } from '../../../../services/carer-job.service';

@Component({
    selector: 'app-apply-for-job',
    templateUrl: './apply-for-job.component.html',
    styleUrls: ['./apply-for-job.component.scss']
})
export class ApplyForJobComponent implements OnInit
{
    jobId: string;
    job: Job;
    constructor(private carerJobService: CarerJobService, private route: ActivatedRoute) {}

    ngOnInit(): void
    {
        this.route.params.subscribe(
            params =>
            {
                this.jobId = params['id'];
                this.getJobDetails();
            }
        );
    }


    private getJobDetails(): void
    {
        this.carerJobService.getJobDetails(this.jobId)
            .subscribe((job: Job) => {
                this.job = job;
            })
    }
}
