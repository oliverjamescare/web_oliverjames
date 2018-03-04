import {Component, OnInit} from '@angular/core';
import {CarerJobService} from '../../../../../services/carer-job.service';
import {ActivatedRoute} from '@angular/router';
import {Job} from '../../../../../models/care-home-booking/job';

@Component({
    selector: 'app-job-details',
    templateUrl: './job-details.component.html',
    styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {
    jobId: string;
    loading = true;
    showConfirmationPopup = false;

    constructor(public carerJobService: CarerJobService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params.subscribe(
            params => {
                this.carerJobService.currentJobId = params['id'];
                this.getJobDetails();
            }
        );
    }

    private getJobDetails(): void {
        this.loading = true;
        this.carerJobService.getJobDetails(this.carerJobService.currentJobId)
            .subscribe(
                (response: Job) => {
                    this.loading = false;
                    console.log('Get job details success response', response);
                    this.carerJobService.jobDetails = response;
                },
                error => {
                    this.loading = false;
                    console.log('Get job details error response', error);
                }
            );
    }

}
