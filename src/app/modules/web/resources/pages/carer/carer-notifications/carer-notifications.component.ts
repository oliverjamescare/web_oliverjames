import {Component, OnInit} from '@angular/core';
import {CarerService} from '../../../../services/carer.service';

@Component({
    selector: 'app-carer-notifications',
    templateUrl: './carer-notifications.component.html',
    styleUrls: ['./carer-notifications.component.scss']
})
export class CarerNotificationsComponent implements OnInit {
    notifications: any[] = [];
    page = 1;
    pages: number[] = [];

    constructor(private carerService: CarerService) {
    }

    ngOnInit() {
        this.getNotifications();
    }

    onPaginationChange(page: number): void {
        this.page = page;
        this.getNotifications();
    }

    private getNotifications(): void {
        this.carerService.getNotifications(this.page)
            .subscribe(
                response => {
                    console.log('Get notifications success response', response);
                    this.notifications = response.results;
                    this.pages = this.setPaginationArray(response.pages);
                },
                error => {
                    console.log('Get notifications error response', error);
                }
            );
    }

    private setPaginationArray(length: number): number[] {
        const arr = [];
        for (let i = 0; i < length; i++) {
            arr.push(i);
        }
        return arr;
    }

}
