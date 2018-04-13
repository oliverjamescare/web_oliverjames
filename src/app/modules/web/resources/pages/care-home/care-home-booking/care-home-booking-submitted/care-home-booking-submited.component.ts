import {Component, OnInit} from '@angular/core';
import {CareHomeBookingService} from '../../../../../services/care-home-booking.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-care-home-submited',
    templateUrl: './care-home-booking-submited.component.html'
})
export class CareHomeBookingSubmitedComponent implements OnInit {
    group: string;

    constructor(private careHomeBookingService: CareHomeBookingService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe(
            params => {
                this.group = params['group'];
                this.getCarersToNotify();
            }
        );
    }

    private getCarersToNotify(): void {
        this.careHomeBookingService.getSubmitedJobsNotifications(this.group)
            .subscribe(
                response => {
                    console.log('Get carers to notify success response', response);
                },
                error => {
                    console.log('Get carers to notify error response', error);
                }
            );
    }

}
