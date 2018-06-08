import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {
    getMessageError,
    handleUniqueValidator,
    handleValidationErrorMessage,
    handleValidationStateClass
} from '../../../../../../utilities/form.utils';
import {
    adult, alpha, equalTo, equalToFieldValue, greaterThan, invalidDate, numbers,
    password
} from '../../../../../../utilities/validators';
import {CarersService} from '../../../../services/carers.service';
import {NotificationsService} from 'angular2-notifications';
import {Router} from '@angular/router';
import { AddressDetail } from '../../../../../web/models/address/address-detail.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-add-carer',
    templateUrl: './add-carer.component.html',
    styleUrls: ['./add-carer.component.scss']
})
export class AddCarerComponent implements OnInit {

    roles: Array<string> = ["Carer", "Senior Carer"]
    qualifications: Array<string> = [
        "Care certificate",
        "QCF / NVQ level 2 in Health & Social Care",
        "QCF / NVQ level 3 in Health & Social Care",
        "QCF / NVQ level 4 in Health & Social Care",
        "QCF / NVQ level 5 in Health & Social Care",
        "Agency carer induction training",
        "Nursing qualification (UK)",
        "Nursing qualification (elsewhere)"
    ];

    genders: Array<string> = [
        "Male",
        "Female"
    ];

    //form config
    form: FormGroup;
    formUtils = {handleValidationStateClass, handleValidationErrorMessage};
    inProgress = false;
    adultDate: Date;

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
            field: 'first_name',
            errors: [
                {
                    error: 'required',
                    message: 'First name is required'
                },
                {
                    error: 'maxlength',
                    message: 'First cannot be longer than 100 characters'
                }
            ]
        },
        {
            field: 'middle_name',
            errors: [
                {
                    error: 'maxlength',
                    message: 'Middle names cannot be longer than 100 characters'
                }
            ]
        },
        {
            field: 'surname',
            errors: [
                {
                    error: 'required',
                    message: 'Surname is required'
                },
                {
                    error: 'maxlength',
                    message: 'Surname cannot be longer than 100 characters'
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
            field: 'date_of_birth',
            errors: [
                {
                    error: 'required',
                    message: 'Date of birth is required'
                },
                {
                    error: 'adult',
                    message: 'You have to be over 18 to register'
                },
                {
                    error: 'invalidDate',
                    message: 'Invalid date'
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
            field: 'mobile',
            errors: [
                {
                    error: 'required',
                    message: 'You must select one filed'
                },
                {
                    error: 'greaterThan',
                    message: 'Using mobile app is required when you register as a carer'
                }
            ]
        },
        {
            field: 'dbs_date',
            errors: [
                {
                    error: 'invalidDate',
                    message: 'Invalid date'
                }
            ]
        },
        {
            field: 'experience_months',
            errors: [
                {
                    error: 'numbers',
                    message: 'This field can contain only numbers'
                },
                {
                    error: 'min',
                    message: 'Number of months cannot be lower than 0'
                },
                {
                    error: 'max',
                    message: 'Number of months cannot be higher than 11'
                }
            ]
        },
        {
            field: 'experience_years',
            errors: [
                {
                    error: 'numbers',
                    message: 'This field can contain only numbers'
                },
                {
                    error: 'min',
                    message: 'Number of years cannot be lower than 0'
                }
            ]
        },
        {
            field: 'fire_safety',
            errors: [
                {
                    error: 'invalidDate',
                    message: 'Invalid date'
                }
            ]
        },
        {
            field: 'dementia',
            errors: [
                {
                    error: 'invalidDate',
                    message: 'Invalid date'
                }
            ]
        },
        {
            field: 'h_and_s',
            errors: [
                {
                    error: 'invalidDate',
                    message: 'Invalid date'
                }
            ]
        },
        {
            field: 'first_aid_awareness',
            errors: [
                {
                    error: 'invalidDate',
                    message: 'Invalid date'
                }
            ]
        },
        {
            field: 'first_aid_and_basic_life_support',
            errors: [
                {
                    error: 'invalidDate',
                    message: 'Invalid date'
                }
            ]
        },
        {
            field: 'infection_control',
            errors: [
                {
                    error: 'invalidDate',
                    message: 'Invalid date'
                }
            ]
        },
        {
            field: 'medication_management',
            errors: [
                {
                    error: 'invalidDate',
                    message: 'Invalid date'
                }
            ]
        },
        {
            field: 'manual_handling_people',
            errors: [
                {
                    error: 'invalidDate',
                    message: 'Invalid date'
                }
            ]
        },
        {
            field: 'safeguarding',
            errors: [
                {
                    error: 'invalidDate',
                    message: 'Invalid date'
                }
            ]
        },
    ];

    referenceMessages = [
        {
            field: 'name',
            errors: [
                {
                    error: 'required',
                    message: 'Reference name is required'
                }
            ]
        },
        {
            field: 'type',
            errors: [
                {
                    error: 'required',
                    message: 'Reference type is required'
                },
            ]
        },
    ]

    constructor(private carersService: CarersService, private notificationService: NotificationsService, private router: Router) {}

    ngOnInit()
    {
        this.createForm();
    }

    private createForm(): void
    {
        this.form = new FormGroup({
            email: new FormControl(null,
                [Validators.required, Validators.email],
                handleUniqueValidator(this.carersService.checkEmailUniqueness.bind(this.carersService))
            ),
            phone_number: new FormControl(null,
                [Validators.required, Validators.minLength(6), numbers],
                handleUniqueValidator(this.carersService.checkPhoneNumberUniqueness.bind(this.carersService))
            ),
            first_name: new FormControl(null, [Validators.required, Validators.maxLength(100), alpha]),
            middle_name: new FormControl('', [Validators.maxLength(100), alpha]),
            surname: new FormControl(null, [Validators.required, Validators.maxLength(100), alpha]),
            gender: new FormControl(''),
            password: new FormControl(null, [Validators.required, Validators.minLength(6), password]),
            password_confirm: new FormControl(null, [Validators.required]),
            date_of_birth: new FormControl(null, [Validators.required, invalidDate, adult]),
            postal_code: new FormControl(null, Validators.required),
            company: new FormControl(''),
            address_line_1: new FormControl(null, Validators.required),
            address_line_2: new FormControl(''),
            city: new FormControl(null, Validators.required),
            eligible_roles: new FormArray(this.roles.map(() => new FormControl(false))),
            references: new FormArray([]),

            //dbs
            dbs_status: new FormControl(null),
            dbs_ref_number: new FormControl(null),
            dbs_date: new FormControl(null, invalidDate),

            //care exp
            experience_months: new FormControl(0, [ Validators.min(0), Validators.max(11), numbers]),
            experience_years: new FormControl(0, [ Validators.min(0), numbers]),

            //training record
            fire_safety: new FormControl(null, invalidDate),
            dementia: new FormControl(null, invalidDate),
            h_and_s: new FormControl(null, invalidDate),
            first_aid_awareness: new FormControl(null, invalidDate),
            first_aid_and_basic_life_support: new FormControl(null, invalidDate),
            infection_control: new FormControl(null, invalidDate),
            medication_management: new FormControl(null, invalidDate),
            manual_handling_people: new FormControl(null, invalidDate),
            safeguarding: new FormControl(null, invalidDate),
            other: new FormControl(null),
            qualifications: new FormArray(this.qualifications.map(() => new FormControl(false))),
        });

        //password
        this.form.get('password')
            .valueChanges
            .subscribe(
                () => {
                    const control = this.form.get('password_confirm');
                    control.setValidators([Validators.required, equalToFieldValue(this.form.get('password').value)]);
                    control.updateValueAndValidity();
                });

        this.form.get('password_confirm')
            .valueChanges
            .subscribe(() => this.form.get('password_confirm').setValidators([Validators.required, equalToFieldValue(this.form.get('password').value)]));

        //datepicker config
        this.adultDate = new Date();
        this.adultDate.setFullYear(this.adultDate.getFullYear() - 18);
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

    //reference handle
    onReferenceControlAdd(): void
    {
        (<FormArray>this.form.get('references')).push(
            new FormGroup({
                name: new FormControl(null, Validators.required),
                type: new FormControl(null, Validators.required)
            })
        );
    }

    onRemoveReferenceControl(index: number): void
    {
        (<FormArray>this.form.get('references')).removeAt(index);
    }

    //submit handle
    onSubmit(): void
    {
        if(this.form.valid)
        {
            this.inProgress = true;
            this.carersService.addCarer(this.prepareDataToCreate())
                .subscribe(
                    response => {
                        this.notificationService.success('Carer created');
                        this.router.navigate(['/admin', 'carers',  response._id]);
                    },
                    (error: HttpErrorResponse) => {
                        this.notificationService.error(getMessageError(error))
                        this.inProgress = false;
                    });
        }
    }

    private prepareDataToCreate(): any
    {
        const roles = [];
        this.form.get('eligible_roles').value.forEach((value, index) => {
            if(value)
                roles.push(this.roles[index]);
        })

        const qualifications = [];
        this.form.get('qualifications').value.forEach((value, index) => {
            if(value)
                qualifications.push(this.qualifications[index]);
        })

        return {
            email: this.form.get('email').value,
            password: this.form.get('password').value,
            phone_number: this.form.get('phone_number').value,
            address: {
                postal_code: this.form.get('postal_code').value,
                city: this.form.get('city').value,
                address_line_1: this.form.get('address_line_1').value,
                address_line_2: this.form.get('address_line_2').value,
                company: this.form.get('company').value
            },
            carer: {
                first_name: this.form.get('first_name').value,
                surname: this.form.get('surname').value,
                middle_name: this.form.get('middle_name').value,
                date_of_birth: this.form.get('date_of_birth').value,
                gender: this.form.get('gender').value,
                reference: {
                    references: this.form.get('references').value
                },
                dbs: {
                    status: this.form.get('dbs_status').value,
                    ref_number: this.form.get('dbs_ref_number').value,
                    dbs_date: new Date(this.form.get('dbs_date').value).getTime(),
                },
                joining_care_experience: {
                    months: this.form.get('experience_months').value || 0,
                    years: this.form.get('experience_years').value || 0
                },
                training_record: {
                    other: this.form.get('other').value,
                    fire_safety: this.form.get('fire_safety').value ? new Date(this.form.get('fire_safety').value).getTime() : null,
                    dementia: this.form.get('dementia').value ? new Date(this.form.get('dementia').value).getTime() : null,
                    h_and_s: this.form.get('h_and_s').value ? new Date(this.form.get('h_and_s').value).getTime() : null,
                    first_aid_awareness: this.form.get('first_aid_awareness').value ? new Date(this.form.get('first_aid_awareness').value).getTime() : null,
                    first_aid_and_basic_life_support: this.form.get('first_aid_and_basic_life_support').value ? new Date(this.form.get('first_aid_and_basic_life_support').value).getTime() : null,
                    infection_control: this.form.get('infection_control').value ? new Date(this.form.get('infection_control').value).getTime() : null,
                    medication_management: this.form.get('medication_management').value ? new Date(this.form.get('medication_management').value).getTime() : null,
                    manual_handling_people: this.form.get('manual_handling_people').value ? new Date(this.form.get('manual_handling_people').value).getTime() : null,
                    safeguarding: this.form.get('safeguarding').value ? new Date(this.form.get('safeguarding').value).getTime() : null,
                    qualifications: qualifications
                },
                eligible_roles: roles
            }
        };
    }
}
