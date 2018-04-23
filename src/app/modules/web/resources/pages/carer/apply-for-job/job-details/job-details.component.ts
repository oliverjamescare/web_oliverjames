import { Component, Input, OnInit } from '@angular/core';
import { CarerJobService } from '../../../../../services/carer-job.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Job } from '../../../../../models/job.model';
import { NotificationsService } from 'angular2-notifications';
import { AuthService } from '../../../../../services/auth.service';

@Component({
    selector: 'app-job-details',
    templateUrl: './job-details.component.html',
    styleUrls: ['./job-details.component.scss']
})

export class JobDetailsComponent implements OnInit
{
    @Input() job: Job;
    loading = true;
    showConfirmationPopup = false;

    constructor(
        private carerJobService: CarerJobService,
        private route: ActivatedRoute,
        private notificationService: NotificationsService,
        private router: Router,
        private authService: AuthService
    ) {}

    ngOnInit(): void {}

    onAcceptJob(): void
    {
        this.showConfirmationPopup = true;
    }

    onDeclineJob(): void
    {
        this.carerJobService.declineJob(this.job.id)
            .subscribe(
                response => {
                    this.notificationService.warn('Job declined');
                    this.router.navigate(['/carer-available-jobs']);
                });
    }

    getFloorPlanLink(): string
    {
        return `${this.job.general_guidance.floor_plan}?access-token=${this.authService.getAccessToken().token}`;
    }

}
