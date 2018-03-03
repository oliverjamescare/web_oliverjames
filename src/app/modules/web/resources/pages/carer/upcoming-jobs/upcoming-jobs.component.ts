import {Component, OnDestroy, OnInit} from '@angular/core';
import {CarerJobService} from '../../../../services/carer-job.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'app-upcoming-jobs',
    templateUrl: './upcoming-jobs.component.html',
    styleUrls: ['./upcoming-jobs.component.scss']
})
export class UpcomingJobsComponent implements OnInit, OnDestroy {
    page = 1;

    getJobsSub: Subscription;

    constructor(public carerService: CarerJobService) {
    }

    ngOnInit() {
        this.getUpcomingJobs();
    }

    ngOnDestroy() {
        this.getJobsSub.unsubscribe();
    }

    private getUpcomingJobs(): void {
        this.getJobsSub = this.carerService.getUpcomingJobs(this.page)
            .subscribe(
                response => console.log('Get upcoming jobs success response', response),
                error => console.log('Get upcoming jobs error respone', error)
            );
    }

}
