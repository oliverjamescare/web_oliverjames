import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CareHomeBookingService} from '../../../../../../services/care-home-booking.service';
import {AuthService} from '../../../../../../services/auth.service';
import {CareHome} from '../../../../../../models/user-sub-models/care-home.model';
import { handleValidationErrorMessage, handleValidationStateClass } from '../../../../../../../../utilities/form.utils';
import { fileSize, fileType } from '../../../../../../../../utilities/validators';

@Component({
    selector: 'app-general-guidance',
    templateUrl: './genral-guidance.component.html',
    styleUrls: ['./genral-guidance.component.scss']
})
export class GeneralGuidanceComponent implements OnInit
{
    careHome: CareHome;
    fileName: string = null;

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
    inProgress = false;

    messages = [
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
    ];

    constructor(public bookingService: CareHomeBookingService, private authService: AuthService) {}

    ngOnInit()
    {
        this.careHome = this.authService.getLoggedUser().care_home;
        this.createGuidanceForm();
        this.setUpForm();
        this.listenToFormChanges();
    }


    getFloorPlan(): string {
        return `${this.bookingService.generalGuidance.floor_plan}?access-token=${this.authService.getAccessToken().token}`;
    }


    private createGuidanceForm(): void {
        this.form = new FormGroup({
            'floor_plan': new FormControl(null),
            'parking': new FormControl(null, Validators.required),
            'notes_for_carers': new FormControl(null, Validators.required),
            'emergency_guidance': new FormControl(null, Validators.required),
            'report_contact': new FormControl(null, Validators.required),
            'superior_contact': new FormControl(null, Validators.required)
        });
    }

    onFileChange(event)
    {
        if (event.target.files.length)
        {
            const fileResource = event.target.files[0];
            if (this.validMimeTypes.indexOf(fileResource.type) !== -1 && fileResource.size < 1024 * 1024 * this.maxFileSizeMB)
                this.bookingService.florPlanFile = fileResource;

            const control = this.form.get('floor_plan');
            control.setValue(fileResource.name);
            this.fileName = fileResource.name;

            control.markAsTouched();
            control.setValidators([Validators.required, fileType(fileResource, this.validMimeTypes), fileSize(fileResource, this.maxFileSizeMB)]);
            control.updateValueAndValidity();

            this.bookingService.fillJobsFieldsBeforeSubmit();
        }
    }

    private setUpForm(): void
    {
        this.form.setValue(this.bookingService.generalGuidanceForm);
    }

    private listenToFormChanges(): void {
        this.form.valueChanges
            .subscribe(
                data => this.bookingService.generalGuidanceForm = data
            );
    }
}
