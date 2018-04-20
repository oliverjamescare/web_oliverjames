import { Component, NgZone, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { alpha, fileSize, fileType, numbers } from '../../../../../../utilities/validators';
import { GoogleService } from '../../../../services/google.service';
import { MapsAPILoader } from '@agm/core';
import { AuthService } from '../../../../services/auth.service';
import { NotificationsService } from 'angular2-notifications';
import { getMessageError, handleValidationErrorMessage, handleValidationStateClass } from '../../../../../../utilities/form.utils';
import { UserService } from '../../../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AddressDetail } from '../../../../models/address/address-detail.model';

@Component({
    selector: 'app-care-home-my-profile',
    templateUrl: './care-home-my-profile.component.html',
    styleUrls: ['./care-home-my-profile.component.scss']
})
export class CareHomeMyProfileComponent implements OnInit
{
    profileDetails: any;
    blockedCarers: any[] = [];

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

    //modals
    showEditEmail = false;
    showChangePassword = false;
    showBlockedCarers = false;
    showEditCardDetails = false;
    buttonLoading = false;

    //form
    form: FormGroup;
    formUtils = { handleValidationStateClass, handleValidationErrorMessage };
    inProgress = false;

    messages = [
        {
            field: 'phone_number',
            errors: [
                {
                    error: 'required',
                    message: 'Phone number is required'
                },
                {
                    error: 'numbers',
                    message: 'Phone number can contain only numbers'
                },
                {
                    error: 'minlength',
                    message: 'Phone number must have 6 characters at least'
                }
            ]
        },
        {
            field: 'name',
            errors: [
                {
                    error: 'required',
                    message: 'Name is required'
                },
                {
                    error: 'alpha',
                    message: 'Name can contain only alphabetical characters'
                },
                {
                    error: 'maxlength',
                    message: 'Name cannot be longer than 100 characters'
                }
            ]
        },
        {
            field: 'postal_code',
            errors: [
                {
                    error: 'required',
                    message: 'Postcode is required'
                }
            ]
        },
        {
            field: 'address_line_1',
            errors: [
                {
                    error: 'required',
                    message: 'This field is required'
                }
            ]
        },
        {
            field: 'city',
            errors: [
                {
                    error: 'required',
                    message: 'City is required'
                }
            ]
        },
        {
            field: 'care_service_name',
            errors: [
                {
                    error: 'required',
                    message: 'Care service name is required'
                },
                {
                    error: 'alpha',
                    message: 'Care service can contain only alphabetical characters'
                },
                {
                    error: 'maxlength',
                    message: 'Care service cannot be longer than 100 characters'
                }
            ]
        },
        {
            field: 'type_of_home',
            errors: [
                {
                    error: 'required',
                    message: 'Type of home is required'
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
    ];

    constructor(private apiService: ApiService,
                private mapsAPILoader: MapsAPILoader,
                private ngZone: NgZone,
                private googleService: GoogleService,
                private userService: UserService,
                private authService: AuthService,
                private notificationService: NotificationsService)
    {
    }

    ngOnInit()
    {
        this.getProfile();
    }

    onSubmit(): void
    {
        this.inProgress = true;
        this.apiService.updateCareHomeProfile(this.prepareDataToUpdate())
            .subscribe(() => {
                    this.inProgress = false;
                    this.notificationService.success('Profile updated!');
                    this.getProfile();
                },
                (error: HttpErrorResponse) => {
                    this.inProgress = false;
                    this.notificationService.error('Error! ' + getMessageError(error));
                });
    }

    onAddressFound(addressDetails: AddressDetail)
    {
        this.form.patchValue({
            postal_code: addressDetails.PostalCode,
            company: addressDetails.Company,
            address_line_1: addressDetails.Line1,
            address_line_2: addressDetails.Line2,
            city: addressDetails.City
        })
    }

    onResendEmail(): void
    {
        this.apiService.resendEmail()
            .subscribe(
                response => {
                    this.notificationService.success('Success', 'Email verification send!');
                });
    }

    onUpdateData(): void
    {
        this.getProfile();
    }

    getFloorPlan(): string
    {
        return `${this.profileDetails.care_home.general_guidance.floor_plan}?access-token=${this.authService.getAccessToken().token}`;
    }

    private getProfile(): void
    {
        this.apiService.getUserProfile()
            .subscribe(
                response => {
                    this.profileDetails = response;
                    this.blockedCarers = this.profileDetails.care_home.blocked_carers;
                    this.createForm();
                }
            );
    }

    private createForm(): void
    {
        this.form = new FormGroup({
            phone_number: new FormControl(this.profileDetails.phone_number,
                [Validators.required, Validators.minLength(6), numbers]
            ),
            name: new FormControl(this.profileDetails.care_home.name, [Validators.required, Validators.maxLength(100), alpha]),
            care_service_name: new FormControl(this.profileDetails.care_home.care_service_name, [Validators.required, Validators.maxLength(100), alpha]),
            type_of_home: new FormControl(this.profileDetails.care_home.type_of_home, [ Validators.required ]),
            postal_code: new FormControl(this.profileDetails.address.postal_code, Validators.required),
            company: new FormControl(this.profileDetails.address.company),
            address_line_1: new FormControl(this.profileDetails.address.address_line_1, Validators.required),
            address_line_2: new FormControl(this.profileDetails.address.address_line_2),
            city: new FormControl(this.profileDetails.address.city, Validators.required),

            gender_preference: new FormControl(this.profileDetails.care_home.gender_preference),
            floor_plan: new FormControl(null),
            parking: new FormControl(this.profileDetails.care_home.general_guidance.parking),
            notes_for_carers: new FormControl(this.profileDetails.care_home.general_guidance.notes_for_carers),
            emergency_guidance: new FormControl(this.profileDetails.care_home.general_guidance.emergency_guidance),
            report_contact: new FormControl(this.profileDetails.care_home.general_guidance.report_contact),
            superior_contact: new FormControl(this.profileDetails.care_home.general_guidance.superior_contact),
        });
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
            control.setValidators([Validators.required, fileType(fileResource, this.validMimeTypes), fileSize(fileResource, this.maxFileSizeMB)]);
            control.updateValueAndValidity();
        }
    }

    private prepareDataToUpdate(): FormData
    {
        const formData = new FormData();
        Object.keys(this.form.value).forEach((key) => {

            if(this.form.value[key] != null && key != "floor_plan")
                formData.append(key, this.form.value[key] || "");
        });

        if(this.floorPlanFile)
            formData.append('floor_plan', this.floorPlanFile);


        return formData;
    }
}
