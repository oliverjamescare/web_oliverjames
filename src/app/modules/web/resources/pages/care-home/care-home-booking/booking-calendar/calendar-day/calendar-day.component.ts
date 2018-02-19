import {Component, Input, OnInit} from '@angular/core';
import {CalendarPopupService} from '../calendar-popup/calendar-popup.service';
import {isUndefined} from 'util';

@Component({
    selector: 'app-calendar-day',
    templateUrl: './calendar-day.component.html'
})
export class CalendarDayComponent implements OnInit {
    @Input() dayNumber: number;
    @Input() date: Date;
    @Input() empty: boolean;
    @Input() jobs: any[];
    @Input() direction: string;
    @Input() index: number;

    constructor(private calendarPopupService: CalendarPopupService) {
    }

    ngOnInit() {
    }

    isOpen(): boolean {
        return this.calendarPopupService.openPopup === this.index;
    }

    onOpenPopup(): void {
        this.calendarPopupService.openPopup = this.index;
    }

    onClosePopup(): void {
        this.calendarPopupService.openPopup = null;
    }

    getDay(empty: boolean, day: Date): number {
        return (empty === true || isUndefined(day)) ? null : day.getDate();
    }

}
