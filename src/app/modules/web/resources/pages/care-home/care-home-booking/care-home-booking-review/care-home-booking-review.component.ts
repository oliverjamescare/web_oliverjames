import {Component, OnInit} from '@angular/core';
import {CareHomeBookingService} from '../../../../../services/care-home-booking.service';
import {Router} from '@angular/router';
import {NotificationsService} from 'angular2-notifications';
import {GeneralGuidance} from '../../../../../models/care-home-booking/general-guidance';
import {AuthService} from '../../../../../services/auth.service';

@Component({
    selector: 'app-care-home-booking-review',
    templateUrl: './care-home-booking-review.component.html'
})
export class CareHomeBookingReviewComponent implements OnInit
{
    showGuidanceForm = false;
    showPreferenceTab = false;

    constructor(
        public bookingService: CareHomeBookingService,
        private router: Router,
        private notificationService: NotificationsService
    ) {}

    ngOnInit() {
        this.getGuidanceInfo();
    }

    onSubmitBookings(): void {
        if (this.bookingService.card_number !== null) {
            this.bookingService.bookJobs()
                .subscribe(
                    response => {
                        this.bookingService.clearAfterBooking();
                        this.router.navigate(['/care-home-booking', 'submited'],
                            { queryParams: { group: response.group } });
                        this.notificationService.success('Success', 'Jobs booked');
                    },
                    error => {
                        console.log('Book jobs error', error);
                    }
                );
        } else {
            this.router.navigate(['/care-home-booking', 'payment-details']);
        }
    }

    private getGuidanceInfo(): void {
        this.showGuidanceForm = false;
        this.showPreferenceTab = false;
        this.bookingService.getGuidanceInfo()
            .subscribe(
                (response: GeneralGuidance) => {
                    this.bookingService.generalGuidance = response;
                    console.log('Guidance info mapped response', response);
                    this.setGuidanceFormValue(response);
                    this.showGuidanceForm = true;
                    this.showPreferenceTab = true;
                },
                error => console.log('Get guidance error response', error)
            );
    }

    private setGuidanceFormValue(generalGuidance: GeneralGuidance): void {
        if (this.bookingService.generalGuidanceForm === null) {
            this.bookingService.generalGuidanceForm = generalGuidance;
        }
    }

}
