import {Component, OnInit} from '@angular/core';
import {CarerJobService} from '../../../../../services/carer-job.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Job} from '../../../../../models/care-home-booking/job';
import {NotificationsService} from 'angular2-notifications';
import {isUndefined} from 'util';
import {AuthService} from '../../../../../services/auth.service';

const HOUR_IN_MILLISECONDS = 3600000;

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
                private router: Router,
                private authService: AuthService) {
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
        this.showConfirmationPopup = true;
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

    getDueIn(job: Job): string {
        const now = new Date();
        const diff = job.start_date - now.getTime();
        const hourDiff = Math.floor(diff / HOUR_IN_MILLISECONDS);
        if (hourDiff > 24) {
            return `${Math.ceil(hourDiff / 24)} day(s)`;
        } else {
            return hourDiff < 1 ? 'Less than hour' : `${hourDiff} hours`;
        }
    }

    getFloorPlanLink(): string {
        return `${this.carerJobService.jobDetails.general_guidance.floor_plan}?access-token=${this.authService.getAccessToken().token}`;
    }

    getGoogleMapsLink(): string {
        const latitude = this.carerJobService.jobDetails.author.address.location.coordinates[0];
        const longitude = this.carerJobService.jobDetails.author.address.location.coordinates[1];
        return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
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
