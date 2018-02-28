import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {
    getMessageError, handleUniqueValidator, handleValidationErrorMessage, handleValidationStateClass
} from '../../../../../utilities/form.utils';
import {Router} from '@angular/router';
import {CareHomeService} from '../../../services/care-home.service';
import {alpha, equalToFieldValue, numbers, password} from '../../../../../utilities/validators';
import {UserService} from '../../../services/user.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    selector: 'app-register-care-home',
    templateUrl: './register-care-home.component.html',
    styleUrls: ['./register-care-home.component.scss']
})
export class RegisterCareHomeComponent implements OnInit {
    // form config
    form: FormGroup;
    formUtils = {handleValidationStateClass, handleValidationErrorMessage};
    inProgress = false;
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
                }
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
                    message: "Passwords don't match"
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
    ];

    constructor(private router: Router, private careHomeService: CareHomeService, private userService: UserService) {
    }

    ngOnInit() {
        // form config
        this.form = new FormGroup({
            email: new FormControl(null,
                [Validators.required, Validators.email],
                handleUniqueValidator(this.userService.checkEmailUniqueness.bind(this.userService))
            ),
            phone_number: new FormControl(null,
                [Validators.required, Validators.minLength(6), numbers],
                handleUniqueValidator(this.userService.checkPhoneNumberUniqueness.bind(this.userService))
            ),
            name: new FormControl(null, [Validators.required, Validators.maxLength(100), alpha]),
            password: new FormControl(null, [Validators.required, Validators.minLength(8), password]),
            password_confirm: new FormControl(null, [Validators.required]),
            postal_code: new FormControl(null, Validators.required),
            company: new FormControl(''),
            address_line_1: new FormControl(null, Validators.required),
            address_line_2: new FormControl(''),
            city: new FormControl(null, Validators.required),
            care_service_name: new FormControl(null, [Validators.required, Validators.maxLength(100), alpha]),
            type_of_home: new FormControl('', [Validators.required]),
        });

        // overriding address
        if (this.careHomeService.addressForm) {
            this.form.patchValue(this.careHomeService.addressForm);
        }

        // password confirmation
        this.form.get('password')
            .valueChanges
            .subscribe(
                (pass: string) => this.form.get('password_confirm').setValidators([Validators.required, equalToFieldValue(pass)]));
    }

    onSubmit() {
        if (this.form.valid) {
            this.inProgress = true;
            this.careHomeService
                .registerCareHome(this.form.value)
                .subscribe(() => {
                        this.inProgress = false;
                        this.router.navigate(['/']);
                    },
                    (error: HttpErrorResponse) => {
                        this.error = getMessageError(error);
                        this.inProgress = false;
                    });
        }
    }
}
