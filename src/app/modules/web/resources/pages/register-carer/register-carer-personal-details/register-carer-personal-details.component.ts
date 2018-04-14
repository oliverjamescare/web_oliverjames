import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarerAuthService } from '../../../../services/carer-auth.service';
import { handleUniqueValidator, handleValidationStateClass, handleValidationErrorMessage }  from '../../../../../../utilities/form.utils';
import { alpha, numbers, equalToFieldValue, invalidDate, adult, password, equalTo, greaterThan } from '../../../../../../utilities/validators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user.service';

@Component({
    selector: 'app-register-carer-personal-details',
    templateUrl: './register-carer-personal-details.component.html',
    styleUrls: [ './register-carer-personal-details.component.scss' ]
})
export class RegisterCarerPersonalDetailsComponent implements OnInit, OnDestroy
{
    steps: Array<{ name: string, active: boolean, completed: boolean }> = [
        {
            name: 'Terms & Conditions',
            active: true,
            completed: true
        },
        {
            name: 'Personal details',
            active: true,
            completed: false
        },
        {
            name: 'CV upload',
            active: false,
            completed: false
        },
        {
            name: 'Q&A',
            active: false,
            completed: false
        }
    ];

    // form config
    form: FormGroup
    formUtils = { handleValidationStateClass, handleValidationErrorMessage }
    pcaControl: any;

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
            field: 'ukPermission',
            errors: [
                {
                    error: 'required',
                    message: 'You must select one filed'
                },
                {
                    error: 'equalTo',
                    message: 'You can\'t register if you don\'t have permissions to work in the UK'
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
            field: 'careExperiance',
            errors: [
                {
                    error: 'required',
                    message: 'You must select one filed'
                },
                {
                    error: 'greaterThan',
                    message: 'You can\'t register if you don\'t have at least 1 year experience'
                }
            ]
        }
    ];

    constructor(private router: Router, private carerService: CarerAuthService, private userService: UserService) {}

    ngOnInit() {
        // protection against missing steps
        // if (this.carerService.registerStep < this.carerService.availableSteps.PERSONAL_DETAILS) {
        //     this.router.navigate(['/carer/register/terms']);
        // }

        // form config
        this.form = new FormGroup({
            email: new FormControl(null,
                [ Validators.required, Validators.email ],
                handleUniqueValidator(this.userService.checkEmailUniqueness.bind(this.userService))
            ),
            phone_number: new FormControl(null,
                [ Validators.required, Validators.minLength(6), numbers ],
                handleUniqueValidator(this.userService.checkPhoneNumberUniqueness.bind(this.userService))
            ),
            first_name: new FormControl(null, [ Validators.required, Validators.maxLength(100), alpha ]),
            middle_name: new FormControl('', [ Validators.maxLength(100), alpha ]),
            surname: new FormControl(null, [ Validators.required, Validators.maxLength(100), alpha ]),
            password: new FormControl(null, [ Validators.required, Validators.minLength(6), password ] ),
            password_confirm: new FormControl(null, [ Validators.required ]),
            date_of_birth: new FormControl(null, [ Validators.required, invalidDate, adult ]),
            postal_code: new FormControl(null, Validators.required),
            company: new FormControl(''),
            address_line_1: new FormControl(null, Validators.required),
            address_line_2: new FormControl(''),
            city: new FormControl(null, Validators.required ),
            ukPermission: new FormControl(null, [ Validators.required, equalTo(1) ]),
            jobRoleCarer: new FormControl(null),
            jobRoleSeniorCarer: new FormControl(null),
            mobile: new FormControl(null, [ Validators.required, greaterThan(0) ]),
            careExperiance: new FormControl(null)
        });

        // overriding values
        if (this.carerService.personalDetailsFormValues) {
            this.form.setValue(this.carerService.personalDetailsFormValues);
        }

        // password confirmation
        this.form.get('password')
            .valueChanges
            .subscribe(
                (pass: string) => this.form.get('password_confirm').setValidators([ Validators.required, equalToFieldValue(pass)]));

        this.form.get('password_confirm')
            .valueChanges
            .subscribe(
                (pass: string) => this.form.get('password').setValidators([Validators.required, equalToFieldValue(pass)]));

        // choosing address event from PCA
        if (pca.load) {
            pca.load();
        }

        pca.on('load', (type, id, control) => {

            control.listen('populate', (address) => {
                 console.log(address);
                 this.form.patchValue({
                     postal_code: address['PostalCode'],
                     company: address['Company'],
                     address_line_1: address['Line1'],
                     address_line_2: address['Line2'],
                     city: address['City']
                 });
             });
        });

        // datepicker config
        const adultDate = new Date();
        adultDate.setFullYear(adultDate.getFullYear() - 18);

        $('#datepicker').datepicker({
            showOtherMonths: true,
            format: 'yyyy-mm-dd',
            maxDate: adultDate,
            value: moment(adultDate).format('YYYY-MM-DD'),
            hide: (event: Event) => this.form.get('date_of_birth').setValue(event.target['value'])
        });
    }

    ngOnDestroy() {
        if (this.pcaControl) {
            this.pcaControl.destroy();
        }
        console.log(this.pcaControl);
    }

    previousStep() {
        this.router.navigate(['/carer/register/terms']);
    }

    onSubmit() {
        if (this.form.valid) {
            this.carerService.personalDetailsFormValues = this.form.value;
            console.log('Carer service personal steps', this.form.value);
            this.carerService.registerStep = this.carerService.availableSteps.CV;

            this.router.navigate(['/carer/register/cv']);
        }
    }
}
