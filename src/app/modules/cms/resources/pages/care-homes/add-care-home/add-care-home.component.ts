import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { alpha, equalToFieldValue, fileSize, fileType, numbers, password } from '../../../../../../utilities/validators';
import {
    getMessageError,
    handleUniqueValidator,
    handleValidationErrorMessage,
    handleValidationStateClass
} from '../../../../../../utilities/form.utils';
import { CareHomesService } from '../../../../services/care-homes.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AddressDetail } from '../../../../../web/models/address/address-detail.model';

@Component({
    selector: 'app-add-care-home',
    templateUrl: './add-care-home.component.html',
    styleUrls: ['./add-care-home.component.scss']
})
export class AddCareHomeComponent implements OnInit
{
    // form config
    form: FormGroup;
    floor_plan: File;
    formUtils = { handleValidationStateClass, handleValidationErrorMessage };
    inProgress = false;
    private validMimeTypes = [
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/pdf",
        "image/png",
        "image/jpg",
        "image/jpeg"
    ];
    private maxFileSizeMB = 10;
    error = '';

    messages = [
        {
            field: 'email',
            errors: [
                {
                    error: 'required',
                    message: 'Email is required'
                },
                {
                    error: 'email',
                    message: 'This is not a valid email address'
                },
                {
                    error: 'uniqueness',
                    message: 'This email is already taken'
                }
            ]
        },
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
                    error: 'uniqueness',
                    message: 'This phone number is already taken'
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
            field: 'password',
            errors: [
                {
                    error: 'required',
                    message: 'Password is required'
                },
                {
                    error: 'minlength',
                    message: 'Password must have 6 characters at least'
                },
                {
                    error: 'password',
                    message: 'Password must have at least one letter and number'
                },
                {
                    error: 'equalToFieldValue',
                    message: 'Passwords don\'t match'
                },
            ]
        },
        {
            field: 'password_confirm',
            errors: [
                {
                    error: 'required',
                    message: 'Password confirmaton is required'
                },
                {
                    error: 'equalToFieldValue',
                    message: 'Passwords don\'t match'
                },
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
                    message: 'Invalid file type'
                },
                {
                    error: 'fileSize',
                    message: 'Your CV cannot be larger than 10MB'
                },
            ]
        },
    ];

    constructor(private careHomesService: CareHomesService, private router: Router) {
    }

    ngOnInit() {
        this.createForm();
    }

    private createForm(): void {
        this.form = new FormGroup({
            email: new FormControl(null,
                [Validators.required, Validators.email],
                handleUniqueValidator(this.careHomesService.checkEmailUniqueness.bind(this.careHomesService))
            ),
            phone_number: new FormControl(null,
                [Validators.required, Validators.minLength(6), numbers],
                handleUniqueValidator(this.careHomesService.checkPhoneNumberUniqueness.bind(this.careHomesService))
            ),
            name: new FormControl(null, [Validators.required, Validators.maxLength(100), alpha]),
            password: new FormControl(null, [Validators.required, Validators.minLength(6), password]),
            password_confirm: new FormControl(null, [Validators.required]),
            postal_code: new FormControl(null, Validators.required),
            company: new FormControl(''),
            address_line_1: new FormControl(null, Validators.required),
            address_line_2: new FormControl(''),
            city: new FormControl(null, Validators.required),
            care_service_name: new FormControl(null, [Validators.required, Validators.maxLength(100), alpha]),
            type_of_home: new FormControl('', [Validators.required]),

            notes: new FormControl(''),
            gender_preference : new FormControl(''),
            floor_plan : new FormControl(null),
            parking: new FormControl(''),
            notes_for_carers: new FormControl(''),
            emergency_guidance: new FormControl(''),
            report_contact: new FormControl(''),
            superior_contact: new FormControl(''),
        });

        this.form.get('password')
            .valueChanges
            .subscribe(
                (pass: string) => this.form.get('password_confirm').setValidators([Validators.required, equalToFieldValue(pass)]));

        this.form.get('password_confirm')
            .valueChanges
            .subscribe(
                (pass: string) => this.form.get('password').setValidators([Validators.required, equalToFieldValue(pass)]));

    }

    //address handle
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

    onFileChange(event)
    {
        if (event.target.files.length)
        {
            const fileResource = event.target.files[0];
            if (this.validMimeTypes.indexOf(fileResource.type) !== -1 && fileResource.size < 1024 * 1024 * this.maxFileSizeMB)
                this.floor_plan = fileResource;


            const control = this.form.get('floor_plan');
            control.setValue(fileResource.name);
            control.markAsTouched();
            control.setValidators([ fileType(fileResource, this.validMimeTypes), fileSize(fileResource, this.maxFileSizeMB)]);
            control.updateValueAndValidity();
        }
    }

    onSubmit()
    {
        if (this.form.valid)
        {
            this.inProgress = true;
            this.careHomesService
                .addCareHome(this.form, this.floor_plan)
                .subscribe(() => {
                        this.inProgress = false;
                        this.router.navigate(["admin",'care-homes']);
                    },
                    (error: HttpErrorResponse) => {
                        this.error = getMessageError(error);
                        this.inProgress = false;
                    });
        }
    }


}
