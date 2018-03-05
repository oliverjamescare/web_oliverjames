import {Component, OnInit} from '@angular/core';
import {CarerJobService} from '../../../../../services/carer-job.service';
import {Job} from '../../../../../models/care-home-booking/job';

@Component({
    selector: 'app-other-jobs',
    templateUrl: './other-jobs.component.html',
    styleUrls: ['./other-jobs.component.scss']
})
export class OtherJobsComponent implements OnInit {
    loading = true;

    constructor(public carerJobService: CarerJobService) {
    }

    ngOnInit() {
        this.getOtherJobs();
    }

    private getOtherJobs(): void {
        this.loading = true;
        this.carerJobService.getOtherJobs()
            .subscribe(
                (response: Job[]) => {
                    this.loading = false;
                    console.log('Get other jobs success response', response);
                    this.carerJobService.otherJobs = response;
                },
                error => {
                    this.loading = false;
                    console.log('Get other jobs error response', error);
                }
            );
    }

}
