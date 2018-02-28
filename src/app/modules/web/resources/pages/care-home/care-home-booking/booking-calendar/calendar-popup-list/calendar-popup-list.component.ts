import {Component, Input, OnInit} from '@angular/core';
import {CalendarPopupService} from '../calendar-popup/calendar-popup.service';

@Component({
    selector: 'app-calendar-popup-list',
    templateUrl: './calendar-popup-list.component.html',
    styleUrls: ['./calendar-popup-list.component.scss']
})
export class CalendarPopupListComponent implements OnInit {
    @Input() allJobs: { start: Date, end: Date, preBooked: boolean }[] = [];
    @Input() index: number;
    @Input() direction: string;

    constructor(private popupService: CalendarPopupService) {
    }

    ngOnInit() {
    }

    onClosePopup(): void {
        this.popupService.openListPopup = null;
    }

    onOpenAddPopup(): void {
        this.popupService.openListPopup = null;
        this.popupService.openAddPopup = this.index;
    }

}
