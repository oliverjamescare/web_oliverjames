import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-calendar-day',
    templateUrl: './calendar-day.component.html'
})
export class CalendarDayComponent implements OnInit {
    @Input() day: number;
    @Input() jobs: any[];
    @Input() direction: string;

    showPopup = false;

    constructor() {
    }

    ngOnInit() {
    }

    onOpenPopup(): void {
        this.showPopup = true;
    }

    onClosePopup(): void {
        this.showPopup = false;
    }

    getDay(day: number): number {
        return day === 0 ? null : day;
    }

}
