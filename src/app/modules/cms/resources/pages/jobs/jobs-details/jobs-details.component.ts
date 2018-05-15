import { Component, OnInit } from '@angular/core';
import { JobsService } from '../../../../services/jobs.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { getMessageError, handleValidationErrorMessage, handleValidationStateClass } from '../../../../../../utilities/form.utils';
import { AuthService } from '../../../../services/auth.service';
import { NotificationsService } from 'angular2-notifications';
import { HttpErrorResponse } from '@angular/common/http';
import { fileSize, fileType } from '../../../../../../utilities/validators';

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
    showResolveChallengeDialog: boolean = false;
    showRetryPaymentDialog: boolean = false;
    showCancelJobDialog: boolean = false;
    seeReviewDialog = false;

    //floor plan
    floorPlanFile: File;
    private validMimeTypes = [
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/pdf',
        'image/png',
        'image/jpg',
        'image/jpeg'
    ];
    private maxFileSizeMB = 10;

    //form
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
            field: 'floor_plan',
            errors: [
                {
                    error: 'fileType',
                    message: 'Invalid file type. Only doc, docx, pdf, png, jpg.'
                },
                {
                    error: 'fileSize',
                    message: 'Your floor plan cannot be larger than 10MB'
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


    onReload(): void
    {
        this.getJobDetails();
    }

    getAuthLink(link: string)
    {
        return `${link}?access-token=${this.authService.getAccessToken()}`;
    }

    onFileChange(event)
    {
        if (event.target.files.length)
        {
            const fileResource = event.target.files[0];
            if (this.validMimeTypes.indexOf(fileResource.type) !== -1 && fileResource.size < 1024 * 1024 * this.maxFileSizeMB)
                this.floorPlanFile = fileResource;

            const control = this.form.get('floor_plan');
            control.setValue(fileResource.name);
            control.markAsTouched();
            control.setValidators([fileType(fileResource, this.validMimeTypes), fileSize(fileResource, this.maxFileSizeMB)]);
            control.updateValueAndValidity();
        }
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
        formData.append('parking', this.form.get('parking').value);
        formData.append('notes_for_carers', this.form.get('notes_for_carers').value);
        formData.append('emergency_guidance', this.form.get('emergency_guidance').value);
        formData.append('report_contact', this.form.get('report_contact').value);
        formData.append('superior_contact', this.form.get('superior_contact').value);
        if (this.floorPlanFile)
            formData.append('floor_plan', this.floorPlanFile);

        //summary sheet
        if (this.form.get('summary_sheet_start_date').value !== null)
            formData.append('summary_sheet_start_date', `${new Date(this.form.get('summary_sheet_start_date').value).getTime()}`);

        if (this.form.get('summary_sheet_end_date').value !== null)
            formData.append('summary_sheet_end_date', `${new Date(this.form.get('summary_sheet_end_date').value).getTime()}`);

        if (this.form.get('voluntary_deduction').value !== null)
            formData.append('voluntary_deduction', `${this.form.get('voluntary_deduction').value}`);

        return formData;
    }

    private getJobDetails(): void {
        this.jobsService
            .getJobDetails(this.jobId)
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

            //summary sheet
            summary_sheet_start_date: new FormControl(this.jobDetails.summary_sheet && this.jobDetails.summary_sheet.start_date ? new Date(this.jobDetails.summary_sheet.start_date) : null),
            summary_sheet_end_date: new FormControl(this.jobDetails.summary_sheet && this.jobDetails.summary_sheet.end_date ? new Date(this.jobDetails.summary_sheet.end_date) : null),
            voluntary_deduction: new FormControl(this.jobDetails.summary_sheet && this.jobDetails.summary_sheet.voluntary_deduction ? this.jobDetails.summary_sheet.voluntary_deduction : null, [Validators.min(0)]),
        });
    }
}
