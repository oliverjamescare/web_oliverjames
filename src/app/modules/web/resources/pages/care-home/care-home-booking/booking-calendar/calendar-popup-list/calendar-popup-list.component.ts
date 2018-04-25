import {Component, Input, OnInit} from '@angular/core';
import {CalendarPopupService} from '../calendar-popup/calendar-popup.service';
import { CareHomeBookingService } from '../../../../../../services/care-home-booking.service';

@Component({
    selector: 'app-calendar-popup-list',
    templateUrl: './calendar-popup-list.component.html',
    styleUrls: ['./calendar-popup-list.component.scss']
})
export class CalendarPopupListComponent implements OnInit {
    @Input() allJobs: { index: number | null, start: Date, end: Date, role: string, preBooked: boolean }[] = [];
    @Input() index: number;
    @Input() direction: string;

    constructor(private popupService: CalendarPopupService, private bookingService: CareHomeBookingService) {
    }

    ngOnInit()
    {
        console.log(this.allJobs)
    }

    onClosePopup(): void {
        this.popupService.openListPopup = null;
    }

    onOpenAddPopup(): void {
        this.popupService.openListPopup = null;
        this.popupService.openAddPopup = this.index;
    }

    onDelete(index: number)
    {
        this.bookingService.removePreBookedJob(index);
    }

    onGoToEdit(): void {
    }

}
