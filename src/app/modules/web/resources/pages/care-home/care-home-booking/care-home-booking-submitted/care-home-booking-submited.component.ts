import { Component, OnInit } from '@angular/core';
import { CareHomeBookingService } from '../../../../../services/care-home-booking.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../../services/auth.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
    selector: 'app-care-home-submited',
    templateUrl: './care-home-booking-submited.component.html',
    styleUrls: ['./care-home-booking-submited.component.scss']
})
export class CareHomeBookingSubmitedComponent implements OnInit
{
    group: string;
    carersToNotify: any[] = [];
    priorityCarers: any[] = [];
    nonPriorityCarers: any[] = [];

    results = 10;
    page: number = 1;
    pages: number = 0;

    constructor(
        private careHomeBookingService: CareHomeBookingService,
        private route: ActivatedRoute,
        private authService: AuthService,
        private notificationService: NotificationsService
    ) {}

    ngOnInit()
    {
        this.route.queryParams.subscribe(
            params => {
                this.group = params['group'];
                this.getCarersToNotify();
            }
        );
    }

    onPageChange(page: number): void
    {
        this.page = page;
        this.getCarersToNotify();
    }

    getProfileImage(carer): string
    {
        return carer.profile_image ?
            `${carer.profile_image}?access-token=${this.authService.getAccessToken().token}`
            : '../../../../../assets/images/placeholder.jpg';
    }

    cancelCarerNotification(carerId: string, index: number): void
    {
        this.careHomeBookingService.cancelCarerNotification(this.group, carerId)
            .subscribe(
                response => {
                    this.carersToNotify.splice(index, 1);
                    this.splitCarers();
                    this.notificationService.success('Notification cancelled');
                }
            );
    }

    private getCarersToNotify(): void
    {
        this.careHomeBookingService.getSubmitedJobsNotifications(this.group, this.page)
            .subscribe(
                response => {
                    this.carersToNotify = response.results;
                    this.pages = response.pages;
                    this.splitCarers();
                }
            );
    }

    private splitCarers(): void
    {
        this.priorityCarers = [];
        this.nonPriorityCarers = [];
        this.carersToNotify.forEach((carer) => {
            carer.isPriority ? this.priorityCarers.push(carer) : this.nonPriorityCarers.push(carer);
        });
    }


}
