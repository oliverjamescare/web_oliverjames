import {Component, Input, OnInit} from '@angular/core';
import {Job} from '../../../../../../../../models/care-home-booking/job';

@Component({
    selector: 'app-carer-calendar-popup',
    templateUrl: './carer-calendar-popup.component.html',
    styleUrls: ['./carer-calendar-popup.component.scss']
})
export class CarerCalendarPopupComponent implements OnInit {
    @Input() job: Job;

    constructor() {
    }

    ngOnInit() {
        console.log('Job', this.job);
    }

}
