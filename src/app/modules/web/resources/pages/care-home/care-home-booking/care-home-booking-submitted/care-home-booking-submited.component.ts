import {Component, OnInit} from '@angular/core';
import {CareHomeBookingService} from '../../../../../services/care-home-booking.service';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../../../../services/auth.service';
import {NotificationsService} from 'angular2-notifications';

@Component({
    selector: 'app-care-home-submited',
    templateUrl: './care-home-booking-submited.component.html',
    styleUrls: ['./care-home-booking-submited.component.scss']
})
export class CareHomeBookingSubmitedComponent implements OnInit {
    group: string;
    carersToNotify: any[] = [];
    priorityCarers: any[] = [];
    nonPriorityCarers: any[] = [];

    results = 10;
    page = 1;
    pages: number[] = [];

    constructor(private careHomeBookingService: CareHomeBookingService,
                private route: ActivatedRoute,
                private authService: AuthService,
                private notificationService: NotificationsService) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe(
            params => {
                this.group = params['group'];
                this.getCarersToNotify();
            }
        );
    }

    onPageChange(page: number): void {
        this.page = page;
        this.getCarersToNotify();
    }

    getProfileImage(carer): string {
        return carer.profile_image ?
            `${carer.profile_image}?access-token=${this.authService.getAccessToken().token}`
            : '../../../../../assets/images/placeholder.jpg';
    }

    cancelCarerNotification(carerId: string, index: number): void {
        this.careHomeBookingService.cancelCarerNotification(this.group, carerId)
            .subscribe(
                response => {
                    console.log('Cancel carer notification success response', response);
                    this.carersToNotify.splice(index, 1);
                    this.splitCarers();
                    this.notificationService.success('Notification cancelled');
                },
                error => {
                    console.log('Cancel carer notication error response', error);
                }
            );
    }

    private getCarersToNotify(): void {
        this.careHomeBookingService.getSubmitedJobsNotifications(this.group, this.page)
            .subscribe(
                response => {
                    console.log('Get carers to notify success response', response);
                    this.carersToNotify = response.results;
                    this.splitCarers();
                    this.pages = this.setPaginationArray(response.pages);
                },
                error => {
                    console.log('Get carers to notify error response', error);
                }
            );
    }

    private splitCarers(): void {
        this.priorityCarers = [];
        this.nonPriorityCarers = [];
        this.carersToNotify.forEach((carer) => {
            carer.isPriority ? this.priorityCarers.push(carer) : this.nonPriorityCarers.push(carer);
        });
    }

    private setPaginationArray(length: number): number[] {
        const arr = [];
        for (let i = 0; i < length; i++) {
            arr.push(i);
        }
        return arr;
    }

}
