import {Component, OnInit} from '@angular/core';
import {CarerJobService} from '../../../../../services/carer-job.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Job} from '../../../../../models/care-home-booking/job';
import {NotificationsService} from 'angular2-notifications';
import {isUndefined} from 'util';

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
                private route: ActivatedRoute,
                private notificationService: NotificationsService,
                private router: Router) {
    }

    ngOnInit() {
        this.route.params.subscribe(
            params => {
                this.carerJobService.currentJobId = params['id'];
                this.getJobDetails();
            }
        );
    }

    onAcceptJob(): void {
        this.carerJobService.acceptJob(this.carerJobService.currentJobId)
            .subscribe(
                response => {
                    console.log('Accept job success response', response);
                    this.notificationService.success('Job accepted');
                    this.showConfirmationPopup = true;
                },
                error => {
                    console.log('Accept job error response', error);
                    if (!isUndefined(error.error.errors[0])) {
                        this.notificationService.warn( error.error.errors[0].message);
                    }
                }
            );
    }

    onDeclineJob(): void {
        this.carerJobService.declineJob()
            .subscribe(
                response => {
                    console.log('Decline job success response', response);
                    this.notificationService.warn('Job declined');
                    this.router.navigate(['/carer-available-jobs']);
                },
                error => {
                    console.log('Decline job error response', error);
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
