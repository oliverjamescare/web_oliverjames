import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {invalidDate} from '../../../../../utilities/validators';
import {getMessageError, handleValidationErrorMessage, handleValidationStateClass} from '../../../../../utilities/form.utils';
import {NotificationsService} from 'angular2-notifications';
import {HttpErrorResponse} from '@angular/common/http';
import * as moment from 'moment';
import {environment} from '../../../../../../environments/environment';
import {AuthService} from '../../../services/auth.service';


@Component({
    selector: 'app-exports',
    templateUrl: './exports.component.html',
    styleUrls: ['./exports.component.scss']
})
export class ExportsComponent implements OnInit {
    formExport: FormGroup;
    now: Date = new Date();

    inProgress: boolean = false;
    error: string = '';
    formUtils = {handleValidationStateClass, handleValidationErrorMessage};
    linkToCsvFile: string;

    private endpoint: string;
    private webEndpoint: string;


    messages = [
        {
            field: 'from',
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
        },
        {
            field: 'to',
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

    constructor(private authService: AuthService, private fb: FormBuilder, private notificationService: NotificationsService) {
        this.endpoint = environment.admin;
        this.webEndpoint = environment.api;
    }

    ngOnInit() {
        this.formExport = new FormGroup({
            from: new FormControl(null, [invalidDate]),
            to: new FormControl(null, [invalidDate]),
            collection: new FormControl('jobs', [Validators.required]),
        });
    }

    onSubmitExport() {
        if (this.formExport.value.from && this.formExport.value.to) {
            if (this.formExport.value.from > this.formExport.value.to) {
                this.notificationService.error('The data range is incorrect');
                return false;
            }
        }
        if (this.formExport.valid) {
            let fromDate, toDate;
            if (this.formExport.value.from)
                fromDate = moment(this.formExport.value.from).format('YYYY-MM-DD');
            if (this.formExport.value.to)
                toDate = moment(this.formExport.value.to).format('YYYY-MM-DD');
            const accessToken = this.authService.getAccessToken();
            this.linkToCsvFile = this.endpoint + '/exports/' + this.formExport.value.collection + '?access-token=' + accessToken;
            if (toDate)
                this.linkToCsvFile = this.endpoint + '/exports/' + this.formExport.value.collection + '?access-token=' + accessToken + '&to=' + toDate;
            if (fromDate)
                this.linkToCsvFile = this.endpoint + '/exports/' + this.formExport.value.collection + '?access-token=' + accessToken + '&from=' + fromDate;
            if (toDate && fromDate)
                this.linkToCsvFile = this.endpoint + '/exports/' + this.formExport.value.collection + '?access-token=' + accessToken + '&from=' + fromDate + '&to=' + toDate;

            const win = window.open(this.linkToCsvFile, '_blank');
            win.focus();
        }
    }

}
