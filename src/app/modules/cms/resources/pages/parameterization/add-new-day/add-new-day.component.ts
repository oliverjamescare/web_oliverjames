import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';

import {NotificationsService} from 'angular2-notifications';
import {ParameterizationService} from '../../../../services/parameterization.service';
import * as moment from 'moment';
import _date = moment.unitOfTime._date;
import {invalidDate, password} from '../../../../../../utilities/validators';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {getMessageError, handleValidationErrorMessage, handleValidationStateClass} from '../../../../../../utilities/form.utils';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    selector: 'app-add-new-day',
    templateUrl: './add-new-day.component.html',
    styleUrls: ['./add-new-day.component.scss']
})
export class AddNewDayComponent implements AfterViewInit, OnInit {
    @Input() title: string;
    @Input() type: string;
    @Input() specialDayId: string;
    @Input() usersRoles;
    @Output() closed = new EventEmitter();
    @Output() reload = new EventEmitter<string>();
    formCustomDay: FormGroup;
    now: Date = new Date();

    inProgress: boolean = false;
    error: string = '';
    formUtils = {handleValidationStateClass, handleValidationErrorMessage};

    pricing =  {
        hour_0_1: 10,
        hour_1_2: 10,
        hour_2_3: 10,
        hour_3_4: 10,
        hour_4_5: 10,
        hour_5_6: 10,
        hour_6_7: 10,
        hour_7_8: 10,
        hour_8_9: 10,
        hour_9_10: 10,
        hour_10_11: 10,
        hour_11_12: 10,
        hour_12_13: 10,
        hour_13_14: 10,
        hour_14_15: 10,
        hour_15_16: 10,
        hour_16_17: 10,
        hour_17_18: 10,
        hour_18_19: 10,
        hour_19_20: 10,
        hour_20_21: 10,
        hour_21_22: 10,
        hour_22_23: 10,
        hour_23_0: 10
    };

    messages = [
        {
            field: 'specialDate',
            errors: [
                {
                    error: 'required',
                    message: 'Date is required'
                },
                {
                    error: 'invalidDate',
                    message: 'Date format is not valid'
                }
            ]
        }
    ];


    constructor(private parameterizationService: ParameterizationService, private notificationService: NotificationsService) {
    }

    ngOnInit() {
        this.formCustomDay = new FormGroup({
            date: new FormControl(null, [Validators.required, invalidDate]),
            role: new FormControl(this.usersRoles[0].role, [Validators.required]),
        });
    }

    ngAfterViewInit() {
        $('#' + this.type + '_id').modal();
        $('#' + this.type + '_id').on('hidden.bs.modal', () => this.closed.emit(true));

    }

    currentDate(): object {
        return new Date();
    }


    submitCustomDay(): void {

        if (this.formCustomDay.valid) {
            this.formCustomDay.value.date = moment(this.formCustomDay.value.date).format('YYYY-MM-DD');

            this.formCustomDay.value.pricing = this.pricing;
            this.inProgress = true;
            this.parameterizationService
                .addSpecialDatePricing(this.formCustomDay.value)
                .subscribe((response) => {
                        this.inProgress = false;
                        $('#' + this.type + '_id').modal('hide');
                        this.reload.emit(response._id);
                        this.notificationService.success('Date added successfully');
                    },
                    (error: HttpErrorResponse) => {
                        this.error = getMessageError(error);
                        this.inProgress = false;
                    });
        }
    }


    cancelAddDay(): void {
        $('#' + this.type + '_id').modal('hide');
    }


}
