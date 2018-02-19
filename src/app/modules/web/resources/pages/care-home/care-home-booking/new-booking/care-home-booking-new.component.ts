import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, UrlSegment} from '@angular/router';

@Component({
    selector: 'app-care-home-booking-new',
    templateUrl: './care-home-booking-new.component.html'
})
export class CareHomeBookingNewComponent implements OnInit {

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
    }

}
