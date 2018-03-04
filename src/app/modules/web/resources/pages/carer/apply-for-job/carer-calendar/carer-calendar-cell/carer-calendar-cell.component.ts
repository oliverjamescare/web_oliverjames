import {Component, Input, OnInit} from '@angular/core';
import {CalendarCell} from '../../../../care-home/care-home-booking/booking-calendar/calendar-cell';

@Component({
    selector: 'app-carer-calendar-cell',
    templateUrl: './carer-calendar-cell.component.html',
    styleUrls: ['./carer-calendar-cell.component.scss']
})
export class CarerCalendarCellComponent implements OnInit {
    @Input() cellData: CalendarCell;

    constructor() {
    }

    ngOnInit() {
    }

}
