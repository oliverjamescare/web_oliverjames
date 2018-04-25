import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CareHomeBookingService } from '../../../../../../services/care-home-booking.service';
import * as moment from 'moment';
import { handleValidationErrorMessage, handleValidationStateClass } from '../../../../../../../../utilities/form.utils';
import { dateGreaterThan } from '../../../../../../../../utilities/validators';

const NUMBER_OF_INTERVALS = 96; // number of 15 min intervals in select list hour from 7:00, 19:00

@Component({
    selector: 'app-calendar-popup',
    templateUrl: './calendar-popup.component.html',
    styleUrls: ['./calendar-popup.component.scss']
})
export class CalendarPopupComponent implements OnInit
{
    @Input() direction: string;
    @Input() date: Date;
    @Input() index: number;
    @Output() closePopup = new EventEmitter();
    form: FormGroup;
    formUtils = { handleValidationStateClass, handleValidationErrorMessage };
    startDate: Date;
    endDate: Date;

    startDays: Array<Date> = [];
    startIntervals: Array<Date> = [];
    endIntervals: Array<Date> = [];
    error: string = "";

    messages = [
        {
            field: 'start_date',
            errors: [
                {
                    error: 'required',
                    message: 'Start date is required'
                },
            ]
        },
        {
            field: 'from',
            errors: [
                {
                    error: 'required',
                    message: 'From is required.'
                }
            ]
        },
        {
            field: 'till',
            errors: [
                {
                    error: 'required',
                    message: 'Till is required'
                },
                {
                    error: 'dateGreaterThan',
                    message: 'Till must be greater than from.'
                }
            ]
        },
        {
            field: 'role',
            errors: [
                {
                    error: 'required',
                    message: 'Role is required'
                }
            ]
        },
        {
            field: 'amount',
            errors: [
                {
                    error: 'required',
                    message: 'Amount is required'
                },
                {
                    error: 'min',
                    message: 'Amount must have 1 at least.'
                },
                {
                    error: 'max',
                    message: 'Amount cannot be larger than 5.'
                },
            ]
        }
    ];

    constructor(public bookingService: CareHomeBookingService) {}

    ngOnInit()
    {
        //init days and times arrays
        this.prepareStartDays();
        this.prepareStartIntervals();
        this.prepareEndIntervals();
        this.calculateInitials();

        this.createForm();

        //on day change
        this.form.get("start_date")
            .valueChanges
            .subscribe((day) => {
                this.date = new Date(day);
                this.date.setHours(0, 0, 0, 0);

                this.prepareStartIntervals();
                this.prepareEndIntervals();

                this.form.patchValue({
                    from: this.startIntervals[0],
                    till: this.endIntervals[0],
                });
            });

        //on start time change
        this.form.get("from")
            .valueChanges
            .subscribe((from) => {

                const end = new Date(from)
                end.setMinutes(end.getMinutes() + 15);
                this.form.get("till").setValue(end);
                this.form.get('till').setValidators([Validators.required, dateGreaterThan(this.form.get('from').value)])
                this.form.get('till').updateValueAndValidity();
            })

        // end time validation
        this.form.get("till")
            .valueChanges
            .subscribe(() => this.form.get('till').setValidators([Validators.required, dateGreaterThan(this.form.get('from').value)]));
    }

    onClosePopup(): void
    {
        this.closePopup.emit();
    }

    onAddBooking(): void
    {
        if(this.form.valid)
        {
            this.addJobsToList();
            this.closePopup.emit();
        }
    }

    private addJobsToList(): void
    {
        for (let i = 0; i < this.form.get('amount').value; i++)
        {
            this.bookingService.bookJob({
                start_date: this.form.get('start_date').value,
                from: new Date(this.form.get('from').value).getTime(),
                till: new Date(this.form.get('till').value).getTime(),
                role: this.form.get('role').value,
                number: 1
            }, new Date(this.form.get('start_date').value).getTime());
        }
    }

    private createForm(): void
    {

        this.form = new FormGroup({
            'start_date': new FormControl(moment(this.startDate).format("YYYY-MM-DD"), Validators.required),
            'from': new FormControl(this.startDate, Validators.required),
            'till': new FormControl(this.endDate, Validators.required),
            'role': new FormControl(null, Validators.required),
            'amount': new FormControl(1, [ Validators.min(1), Validators.max(5) ])
        });
    }

    //preparing dates
    private prepareStartDays()
    {
        const now = new Date();

        this.bookingService.calendar.forEach(day => {
            if(day.day.getTime() >= now.getTime() || now.getDate() == day.day.getDate())
                this.startDays.push(day.day)
        })
    }

    private prepareStartIntervals() : void
    {
        //basic intervals setup
        this.startIntervals = [];
        const date = new Date(this.date.getTime());
        date.setHours(0, 0, 0, 0);

        for(let i = 0; i < NUMBER_OF_INTERVALS; i++)
        {
            this.startIntervals.push(new Date(date.getTime()));
            date.setMinutes(date.getMinutes() + 15);
        }

        //removing past dates
        const now = new Date();
        //now.setHours(23,59,0,0);
        this.startIntervals = this.startIntervals.filter(intervalDate => now.getTime() <= intervalDate.getTime());
    }

    private prepareEndIntervals() : void
    {
        //next day start
        const nextDayStart = this.getNexDayStart();

        //preparing end intervals
        this.endIntervals = [];
        const date = new Date(this.startIntervals[1] ? this.startIntervals[1].getTime() : nextDayStart.getTime());
        for(let i = 0; i < NUMBER_OF_INTERVALS; i++)
        {
            this.endIntervals.push(new Date(date.getTime()));
            date.setMinutes(date.getMinutes() + 15);
        }
    }

    private getNexDayStart() : Date
    {
        const nextDayStart = new Date(this.date.getTime())
        nextDayStart.setDate(nextDayStart.getDate() + 1);
        nextDayStart.setHours(0, 0, 0, 0);

        return nextDayStart;
    }

    private calculateInitials()
    {
        //creating dates
        const now = new Date();
        this.startDate = new Date(this.startIntervals.find(date => now.getTime() <= date.getTime()) || this.getNexDayStart());
        this.endDate = new Date(this.startDate.getTime())
        this.endDate.setMinutes(this.endDate.getMinutes() + 15);
    }
}
