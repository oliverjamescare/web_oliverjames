import {Component, OnInit} from '@angular/core';
import {CareHomeBookingService} from '../../../../../services/care-home-booking.service';
import {Router} from '@angular/router';
import {NotificationsService} from 'angular2-notifications';

@Component({
    selector: 'app-care-home-booking-review',
    templateUrl: './care-home-booking-review.component.html'
})
export class CareHomeBookingReviewComponent implements OnInit {

    constructor(public bookingService: CareHomeBookingService,
                private router: Router,
                private notificationService: NotificationsService) {
    }

    ngOnInit() {
    }

    onSubmitBookings(): void {
        this.bookingService.bookJobs()
            .subscribe(
                response => {
                    this.bookingService.clearAfterBooking();
                    this.router.navigate(['care-home-dashboard']);
                    this.notificationService.success('Success', 'Jobs booked');
                },
                error => console.log('Book jobs error', error)
            );
    }

}
