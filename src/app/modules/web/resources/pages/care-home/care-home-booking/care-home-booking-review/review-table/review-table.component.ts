import {Component, OnInit} from '@angular/core';
import {PreBookedJob} from '../../../../../../models/care-home-booking/pre-booked-job';
import {CareHomeBookingService} from '../../../../../../services/care-home-booking.service';

@Component({
    selector: 'app-review-table',
    templateUrl: './review-table.component.html',
    styleUrls: ['./review-table.component.scss']
})
export class ReviewTableComponent implements OnInit {
    showTable = false;

    constructor(public bookingService: CareHomeBookingService) {
    }

    ngOnInit() {
        this.checkCarersToContact();
    }

    onJobRemove(index: number): void {
        this.bookingService.removePreBookedJob(index);
    }

    private checkCarersToContact(): void {
        this.bookingService.cheekCarersToContact()
            .subscribe(
                (response: PreBookedJob[]) => {
                    this.bookingService.preBookedJobs = response;
                    this.showTable = true;
                    console.log('pre boked job response', response);
                }, error => {
                    console.log('check carers to contact error response', error);
                }
            );
    }

}
