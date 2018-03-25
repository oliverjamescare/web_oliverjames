import {Component, OnInit} from '@angular/core';
import {JobsService} from '../../../../services/jobs.service';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {isUndefined} from 'util';
import * as dateformat from 'dateformat';
import {handleValidationErrorMessage, handleValidationStateClass} from '../../../../../../utilities/form.utils';
import {AuthService} from '../../../../services/auth.service';
import {NotificationsService} from 'angular2-notifications';

const TIMESTAMP_INTERVAL = 900000; // 15 min in milliseconds
const MIN_IN_MILLISECONDS = 60000;
const NUMBER_OF_INTERVALS = 97; // number of 15 min intervals in select list hour from 7:00, 19:00

@Component({
    selector: 'app-jobs-details',
    templateUrl: './jobs-details.component.html',
    styleUrls: ['./jobs-details.component.scss']
})
export class JobsDetailsComponent implements OnInit {
    jobId: string;
    jobDetails: any;
    floorPlanFile: File;
    floorPlanError: string;
    form: FormGroup;
    formUtils = {handleValidationStateClass, handleValidationErrorMessage};
    errors = [];
    buttonLoading = false;

    timeArr: { timestamp: number, formatedDate: string }[] = [];

    // dialogs
    showCancelJobDialog = false;
    waiveCharges: boolean;

    messages = [
        {
            field: 'parking',
            errors: [
                {
                    error: 'required',
                    message: 'This field ids required'
                }
            ]
        },
        {
            field: 'notes_for_carers',
            errors: [
                {
                    error: 'required',
                    message: 'This field ids required'
                }
            ]
        },
        {
            field: 'emergency_guidance',
            errors: [
                {
                    error: 'required',
                    message: 'This field ids required'
                }
            ]
        },
        {
            field: 'report_contact',
            errors: [
                {
                    error: 'required',
                    message: 'This field ids required'
                }
            ]
        },
        {
            field: 'superior_contact',
            errors: [
                {
                    error: 'required',
                    message: 'This field ids required'
                }
            ]
        },
        {
            field: 'voluntary_deduction',
            errors: [
                {
                    error: 'min',
                    message: 'Value cannot be negative'
                }
            ]
        }
    ];

    private allowedMimeTypes = [
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/pdf',
        'image/png',
        'image/jpg',
        'image/jpeg'
    ];

    constructor(private jobsService: JobsService,
                private route: ActivatedRoute,
                private authService: AuthService,
                private notificationService: NotificationsService) {
    }

    ngOnInit() {
        this.createForm();
        this.route.params.subscribe(
            params => {
                this.jobId = params['id'];
                this.getJobDetails();
            }
        );
    }

    openCancelJobPopup(waiveCharges: boolean): void {
        this.waiveCharges = waiveCharges;
        this.showCancelJobDialog = true;
    }

    onReload(): void {
        console.log('On reload');
        this.getJobDetails();
    }

    handleFileInput(files: FileList) {
        const file = files.item(0);
        if (this.allowedMimeTypes.indexOf(file.type) !== -1) {
            this.floorPlanError = null;
            this.floorPlanFile = file;
        } else {
            this.floorPlanError = 'Invalid file type';
        }
    }

    getTokenParameter(): string {
        return `?access-token=${this.authService.getAccessToken()}`;
    }

    onUpdateJob(): void {
        this.buttonLoading = true;
        this.jobsService.updateJob(this.jobId, this.getJobDetailsToUpdate())
            .subscribe(
                response => {
                    console.log('Update job details success response', response);
                    this.errors = [];
                    this.getJobDetails();
                },
                error => {
                    console.log('Update job details error response', error);
                    this.notificationService.error('Edid job details failed');
                    this.errors = error.error.errors;
                }
            );

    }

    private getJobDetailsToUpdate(): any {
        const formData = new FormData();
        formData.append('start_date', `${this.getDate('start_date')}`);
        formData.append('end_date', `${this.getDate('end_date')}`);
        formData.append('role', this.form.get('role').value);
        if (this.floorPlanFile) {
            formData.append('floor_plan', this.floorPlanFile);
        }
        formData.append('parking', this.form.get('parking').value);
        formData.append('notes_for_carers', this.form.get('notes_for_carers').value);
        formData.append('emergency_guidance', this.form.get('emergency_guidance').value);
        formData.append('report_contact', this.form.get('report_contact').value);
        console.log('report contact', this.form.get('report_contact').value);
        formData.append('superior_contact', this.form.get('superior_contact').value);
        formData.append('notes', this.form.get('notes').value);
        formData.append('gender_preference', this.form.get('gender_preference').value);
        formData.append('manual_booking', this.getManualBooking());
        if (this.form.get('summary_sheet_start_date').value !== null) {
            formData.append('summary_sheet_start_date', `${new Date(this.form.get('summary_sheet_start_date').value).getTime()}`);
            console.log('summary start', `${new Date(this.form.get('summary_sheet_start_date').value).getTime()}`);
        }
        if (this.form.get('summary_sheet_end_date').value !== null) {
            formData.append('summary_sheet_end_date', `${new Date(this.form.get('summary_sheet_end_date').value).getTime()}`);
        }
        if (this.form.get('voluntary_deduction').value !== null) {
            formData.append('voluntary_deduction', `${new Date(this.form.get('voluntary_deduction').value).getTime()}`);
        }
        return formData;
    }

    private getManualBooking(): string {
        return this.form.get('manual_booking').value ? 'ENABLED' : 'DISABLED';
    }

    private getDate(property: string): number {
        const d = new Date(this.form.get('start').value);
        d.setHours(0, 0, 0, 0);
        const hour = new Date(this.getTimestamp(this.form.get(property).value));
        d.setHours(hour.getHours(), hour.getMinutes(), hour.getSeconds());
        return d.getTime();
    }

    private getTimestamp(formatedDate: string): number {
        let findedTimestamp = 0;
        this.timeArr.forEach((element) => {
            if (element.formatedDate === formatedDate) {
                console.log('inside loop', element.timestamp);
                findedTimestamp = element.timestamp;
            }
        });
        return findedTimestamp + MIN_IN_MILLISECONDS;
    }


    private getJobDetails(): void {
        this.jobsService.getJobDetails(this.jobId)
            .subscribe(
                response => {
                    console.log('Get job details response', response);
                    this.jobDetails = response;
                    this.setUpForm();
                },
                error => console.log('Get job details error response', error)
            );
    }

    private createForm(): void {
        this.form = new FormGroup({
            start: new FormControl(null),
            start_date: new FormControl(null),
            end_date: new FormControl(null),
            role: new FormControl(null),
            floor_plan: new FormControl(null),
            parking: new FormControl(null, Validators.required),
            notes_for_carers: new FormControl(null, Validators.required),
            emergency_guidance: new FormControl(null, Validators.required),
            report_contact: new FormControl(null, Validators.required),
            superior_contact: new FormControl(null, Validators.required),
            notes: new FormControl(''),
            gender_preference: new FormControl(null),
            manual_booking: new FormControl(null),
            summary_sheet_start_date: new FormControl(null),
            summary_sheet_end_date: new FormControl(null),
            voluntary_deduction: new FormControl(null, [Validators.min(0)]),
        });
    }

    private setUpForm(): void {
        this.form.get('start').setValue(dateformat(this.jobDetails.start_date, 'yyyy-mm-dd'));
        this.form.get('start_date').setValue(dateformat(this.jobDetails.start_date, 'shortTime'));
        this.form.get('end_date').setValue(dateformat(this.jobDetails.end_date, 'shortTime'));
        this.form.get('role').setValue(this.jobDetails.role);
        this.form.get('parking').setValue(this.jobDetails.general_guidance.parking);
        this.form.get('notes_for_carers').setValue(this.jobDetails.general_guidance.notes_for_carers);
        this.form.get('emergency_guidance').setValue(this.jobDetails.general_guidance.emergency_guidance);
        this.form.get('report_contact').setValue(this.jobDetails.general_guidance.report_contact);
        this.form.get('superior_contact').setValue(this.jobDetails.general_guidance.superior_contact);
        this.form.get('notes').setValue(this.jobDetails.notes);
        this.form.get('gender_preference').setValue(this.jobDetails.gender_preference);
        this.form.get('manual_booking').setValue(this.jobDetails.manual_booking);
        if (!isUndefined(this.jobDetails.summary_sheet)) {
            this.form.get('summary_sheet_start_date').setValue(dateformat(this.jobDetails.summary_sheet.start_date, 'yyyy-mm-dd'));
            this.form.get('summary_sheet_end_date').setValue(dateformat(this.jobDetails.summary_sheet.end_date, 'yyyy-mm-dd'));
            this.form.get('voluntary_deduction').setValue(this.jobDetails.summary_sheet.voluntary_deduction);
        }
        this.setHoursIntervals();
    }

    private getStartTime(): Date {
        const date = new Date(this.form.get('start').value);
        date.setHours(0, 0, 0, 0);
        return date;
    }

    private setHoursIntervals(): void {
        for (let i = 0; i < NUMBER_OF_INTERVALS; i++) {
            if (i === NUMBER_OF_INTERVALS - 1) {
                this.timeArr.push({
                    timestamp: this.getStartTime().getTime() + i * TIMESTAMP_INTERVAL - MIN_IN_MILLISECONDS,
                    formatedDate: dateformat(this.getStartTime().getTime() + i * TIMESTAMP_INTERVAL - MIN_IN_MILLISECONDS, 'shortTime')
                });
            } else {
                this.timeArr.push({
                    timestamp: this.getStartTime().getTime() + i * TIMESTAMP_INTERVAL - MIN_IN_MILLISECONDS,
                    formatedDate: dateformat(this.getStartTime().getTime() + i * TIMESTAMP_INTERVAL, 'shortTime')
                });
            }
        }
    }

}
