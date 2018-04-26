import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { CarerProfileService } from '../../../../services/carer-profile.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { AuthService } from '../../../../services/auth.service';
import { ApiService } from '../../../../services/api.service';
import { Router } from '@angular/router';
import {} from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';
import { GoogleService } from '../../../../services/google.service';
import { alpha, numbers } from '../../../../../../utilities/validators';
import { User } from '../../../../models/user.model';
import { handleValidationErrorMessage, handleValidationStateClass } from '../../../../../../utilities/form.utils';
import { AddressDetail } from '../../../../models/address/address-detail.model';

@Component({
    selector: 'app-carer-my-profile',
    templateUrl: './carer-my-profile.component.html',
    styleUrls: ['./carer-my-profile.component.scss']
})
export class CarerMyProfileComponent implements OnInit
{
    user: User;
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
            field: 'max_job_distance',
            errors: [
                {
                    error: 'required',
                    message: 'Max job distance is required'
                },
                {
                    error: 'min',
                    message: 'Max job distance cannot be lower than 0.'
                },
            ]
        },
    ];

    // show hide modals
    showEditEmail = false;
    showChangePassword = false;
    showChangeProfileImage = false;
    showBankAccountForm = false;

    constructor(public carerProfileService: CarerProfileService,
                private notificationService: NotificationsService,
                public authService: AuthService,
                private apiService: ApiService,
                private router: Router,
                private mapsAPILoader: MapsAPILoader,
                private ngZone: NgZone,
                private googleService: GoogleService
    ) {}

    ngOnInit()
    {
        this.getCarerProfile();
    }


    onRoleChange(): void
    {
        this.router.navigate(['/carer-dashboard', 'contact']);
    }

    onUpdateData(): void
    {
        this.getCarerProfile();
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

    onSubmit(): void
    {
        this.inProgress = true;
        const data = this.form.value;
        data.max_job_distance = +data.max_job_distance;
        this.carerProfileService.updateCarerProfile(data)
            .subscribe(
                response =>
                {
                    this.inProgress = false;
                    this.getCarerProfile();
                    this.notificationService.success('Carer profile', 'Successfully updated');
                },
                error =>
                {
                    this.inProgress = false;
                    this.notificationService.warn('Update carer profile failed');
                }
            );
    }

    //resend email handle
    onResendEmail(): void
    {
        this.apiService.resendEmail()
            .subscribe(
                response => {
                    this.notificationService.success('Success', 'Email verification resend');
                }
            );
    }

    //profile url
    getProfileUrl(): string
    {
        return this.user.carer.profile_image ? this.user.carer.profile_image + '?access-token=' + this.authService.getAccessToken().token : null;
    }

    //setting up form
    private createForm(): void
    {
        this.form = new FormGroup({
            phone_number: new FormControl(this.user.phone_number,
                [Validators.required, Validators.minLength(6), numbers]
            ),
            max_job_distance: new FormControl(this.user.carer.max_job_distance, [Validators.required, Validators.min(0)]),
            postal_code: new FormControl(this.user.address.postal_code, Validators.required),
            company: new FormControl(this.user.address.company),
            address_line_1: new FormControl(this.user.address.address_line_1, Validators.required),
            address_line_2: new FormControl(this.user.address.address_line_2),
            city: new FormControl(this.user.address.city, Validators.required),
        });
    }

    //getting profile
    private getCarerProfile(): void
    {
        this.carerProfileService.getCarerProfile()
            .subscribe((user: User) => {
                    this.user = user;
                    console.log(this.user)
                    this.createForm();
                });
    }

    onBankUpdated()
    {
        this.showBankAccountForm = false;
        this.getCarerProfile();
    }

}


