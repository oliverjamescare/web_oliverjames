import {Component, OnInit} from '@angular/core';
import {CareHomeBookingService} from '../../../../../../services/care-home-booking.service';

@Component({
    selector: 'app-priority-carers-list',
    templateUrl: './priority-carers-list.component.html',
    styleUrls: ['./priority-carers-list.component.scss']
})
export class PriorityCarersListComponent implements OnInit {

    constructor(public bookingService: CareHomeBookingService) {
    }

    ngOnInit() {
    }

    onCarerRemove(index: number): void {
        console.log('Index to remove', index);
        this.bookingService.priorityCarers.splice(index, 1);
    }

}
