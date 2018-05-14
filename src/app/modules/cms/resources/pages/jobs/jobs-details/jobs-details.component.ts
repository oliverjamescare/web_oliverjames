import {Component, OnInit} from '@angular/core';
import {JobsService} from '../../../../services/jobs.service';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {isUndefined} from 'util';
import * as dateformat from 'dateformat';
import { getMessageError, handleValidationErrorMessage, handleValidationStateClass } from '../../../../../../utilities/form.utils';
import {AuthService} from '../../../../services/auth.service';
import {NotificationsService} from 'angular2-notifications';
import { HttpErrorResponse } from '@angular/common/http';

const TIMESTAMP_INTERVAL = 900000; // 15 min in milliseconds
const MIN_IN_MILLISECONDS = 60000;
const NUMBER_OF_INTERVALS = 97; // number of 15 min intervals in select list hour from 7:00, 19:00

@Component({
    selector: 'app-jobs-details',
    templateUrl: './jobs-details.component.html',
    styleUrls: ['./jobs-details.component.scss']
})
export class JobsDetailsComponent implements OnInit
{
    jobId: string;
    jobDetails: any;

    //dialogs
    showCancelJobDialog = false;
    waiveCharges: boolean;
    showResolveChallengeDialog = false;
    seeReviewDialog = false;

    //form
    floorPlanFile: File;
    form: FormGroup;
    formUtils = { handleValidationStateClass, handleValidationErrorMessage };
    inProgress: boolean = false;
    editMode: boolean = true;
    now: Date = new Date();

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
            field: 'summary_sheet_start_date',
            errors: [
                {
                    error: 'required',
                    message: 'This field ids required'
                }
            ]
        },
        {
            field: 'summary_sheet_end_date',
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

    constructor(
        private jobsService: JobsService,
                private route: ActivatedRoute,
                private authService: AuthService,
                private notificationService: NotificationsService
    ) {}

    ngOnInit()
    {
        //getting job
        this.route.params.subscribe(
            params => {
                this.jobId = params['id'];
                this.getJobDetails();
            }
        );
    }

    openCancelJobPopup(waiveCharges: boolean): void
    {
        this.waiveCharges = waiveCharges;
        this.showCancelJobDialog = true;
    }

    onReload(): void
    {
        this.getJobDetails();
    }

    getAuthLink(link: string)
    {
        return `${link}?access-token=${this.authService.getAccessToken()}`;
    }

    onSubmit(): void
    {
        if(this.form.valid)
        {
            this.inProgress = true;
            this.jobsService.updateJob(this.jobId, this.getJobDetailsToUpdate())
                .subscribe(
                    response => {
                        this.inProgress = false;
                        this.notificationService.success('Job updated successfully');
                        this.getJobDetails();
                    },
                    (error: HttpErrorResponse) => {
                        this.inProgress = false;
                        this.notificationService.error(getMessageError(error));
                    }
                );
        }


    }

    private getJobDetailsToUpdate(): FormData
    {
        const formData = new FormData();

        //basic
        formData.append('start_date', `${new Date(this.form.get('start_date').value).getTime()}`);
        formData.append('end_date', `${new Date(this.form.get('end_date').value).getTime()}`);
        formData.append('role', this.form.get('role').value);
        formData.append('manual_booking', this.form.get('manual_booking').value);
        formData.append('gender_preference', this.form.get('gender_preference').value);
        formData.append('notes', this.form.get('notes').value);


        //general guidance
        // if (this.floorPlanFile) {
        //     formData.append('floor_plan', this.floorPlanFile);
        // }
        // formData.append('parking', this.form.get('parking').value);
        // formData.append('notes_for_carers', this.form.get('notes_for_carers').value);
        // formData.append('emergency_guidance', this.form.get('emergency_guidance').value);
        // formData.append('report_contact', this.form.get('report_contact').value);
        // formData.append('superior_contact', this.form.get('superior_contact').value);
        //formData.append('manual_booking', this.getManualBooking());
        // if (this.form.get('summary_sheet_start_date').value !== null) {
        //     formData.append('summary_sheet_start_date', `${new Date(this.form.get('summary_sheet_start_date').value).getTime()}`);
        //     console.log('summary start', `${new Date(this.form.get('summary_sheet_start_date').value).getTime()}`);
        // }
        // if (this.form.get('summary_sheet_end_date').value !== null) {
        //     formData.append('summary_sheet_end_date', `${new Date(this.form.get('summary_sheet_end_date').value).getTime()}`);
        // }
        // if (this.form.get('voluntary_deduction').value !== null) {
        //     formData.append('voluntary_deduction', `${new Date(this.form.get('voluntary_deduction').value).getTime()}`);
        // }
        return formData;
    }

    private getJobDetails(): void {
        this.jobsService.getJobDetails(this.jobId)
            .subscribe(response => {
                    this.jobDetails = response;
                    this.editMode = this.jobDetails.status == "CANCELLED" || this.jobDetails.status == "PAID" || this.jobDetails.status == "PAYMENT_CANCELLED" ? false : true;
                    this.initForm();
                }
            );
    }

    private initForm(): void
    {
        this.form = new FormGroup({
            start_date: new FormControl(new Date(this.jobDetails.start_date)),
            end_date: new FormControl(new Date(this.jobDetails.end_date)),
            role: new FormControl(this.jobDetails.role),
            notes: new FormControl(this.jobDetails.notes),
            gender_preference: new FormControl(this.jobDetails.gender_preference),
            manual_booking: new FormControl(this.jobDetails.manual_booking ? "ENABLED" : "DISABLED"),

            //general guidance
            floor_plan: new FormControl(null),
            parking: new FormControl(this.jobDetails.general_guidance.parking, Validators.required),
            notes_for_carers: new FormControl(this.jobDetails.general_guidance.notes_for_carers, Validators.required),
            emergency_guidance: new FormControl(this.jobDetails.general_guidance.emergency_guidance, Validators.required),
            report_contact: new FormControl(this.jobDetails.general_guidance.report_contact, Validators.required),
            superior_contact: new FormControl(this.jobDetails.general_guidance.superior_contact, Validators.required),
            // summary_sheet_start_date: new FormControl(null, Validators.required),
            // summary_sheet_end_date: new FormControl(null, Validators.required),
            // voluntary_deduction: new FormControl(null, [Validators.min(0)]),
        });
    }
}
