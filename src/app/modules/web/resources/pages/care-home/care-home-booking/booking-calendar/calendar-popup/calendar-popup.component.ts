import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-calendar-popup',
    templateUrl: './calendar-popup.component.html',
    styleUrls: ['./calendar-popup.component.scss']
})
export class CalendarPopupComponent implements OnInit {
    @Input() direction: string;
    @Output() closePopup = new EventEmitter();
    form: FormGroup;

    constructor() {
    }

    ngOnInit() {
        this.createForm();
    }

    onClosePopup(): void {
        this.closePopup.emit();
    }

    private createForm(): void {
        this.form = new FormGroup({
            'start_date': new FormControl(),
            'from': new FormControl(),
            'til': new FormControl(),
        });
    }

}
