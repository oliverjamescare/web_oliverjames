import {Component, Input, OnInit} from '@angular/core';
import {CalendarPopupService} from '../calendar-popup/calendar-popup.service';

@Component({
    selector: 'app-calendar-day',
    templateUrl: './calendar-day.component.html'
})
export class CalendarDayComponent implements OnInit {
    @Input() day: number;
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

    getDay(day: number): number {
        return day === 0 ? null : day;
    }

}
