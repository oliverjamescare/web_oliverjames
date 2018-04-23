import { Component, OnInit } from '@angular/core';
import { CarerService } from '../../../../services/carer.service';
import { Notification } from '../../../../models/notification.model';

@Component({
    selector: 'app-carer-notifications',
    templateUrl: './carer-notifications.component.html',
    styleUrls: ['./carer-notifications.component.scss']
})
export class CarerNotificationsComponent implements OnInit
{
    page: number = 1;
    pages: number = 0;
    notifications: Array<Notification> = [];

    constructor(private carerService: CarerService) {}

    ngOnInit()
    {
        this.getNotifications();
    }

    onPageChange(page: number): void
    {
        this.page = page;
        this.getNotifications();
    }

    private getNotifications(): void
    {
        this.carerService.getNotifications(this.page)
            .subscribe((response: { notifications: Array<Notification>, pages: number }) => {
                    this.notifications = response.notifications;
                    this.pages = response.pages;
                }
            );
    }

}
