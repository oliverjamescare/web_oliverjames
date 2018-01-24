import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarerService } from '../../../../services/carer.service';
import { handleUniqueValidator, handleValidationStateClass, handleValidationErrorMessage }  from '../../../../utilities/form.utils';
import { alpha, numbers } from '../../../../utilities/validators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user.service';

@Component({
    selector: 'app-register-carer-personal-details',
    templateUrl: './register-carer-personal-details.component.html',
    styleUrls: [ './register-carer-personal-details.component.scss' ]
})
export class RegisterCarerPersonalDetailsComponent implements OnInit
{
    addressVisible = false;
    steps: Array<{ name: string, active: boolean, completed: boolean }> = [
        {
            name: "Terms & Conditions",
            active: true,
            completed: true
        },
        {
            name: "Personal details",
            active: true,
            completed: false
        },
        {
            name: "CV upload",
            active: false,
            completed: false
        },
        {
            name: "Q&A",
            active: false,
            completed: false
        }
    ];

    form: FormGroup
    formUtils = { handleValidationStateClass, handleValidationErrorMessage }

    messages = [
        {
            field: 'email',
            errors: [
                {
                    error: 'required',
                    message: "Email is required"
                },
                {
                    error: 'email',
                    message: "This is not a valid email address"
                },
                {
                    error: 'uniqueness',
                    message: "This email is already taken"
                }
            ]
        },
        {
            field: 'phone_number',
            errors: [
                {
                    error: 'required',
                    message: "Phone number is required"
                },
                {
                    error: 'numbers',
                    message: "Phone number can contain only numbers"
                },
                {
                    error: 'uniqueness',
                    message: "This phone number is already taken"
                },
                {
                    error: 'minlength',
                    message: "Phone number must have 6 characters at least"
                }
            ]
        },
        {
            field: 'first_name',
            errors: [
                {
                    error: 'required',
                    message: "First name is required"
                },
                {
                    error: 'maxlength',
                    message: "First cannot be longer than 100 characters"
                }
            ]
        },
        {
            field: 'middle_name',
            errors: [
                {
                    error: 'maxlength',
                    message: "Middle names cannot be longer than 100 characters"
                }
            ]
        },
        {
            field: 'surname',
            errors: [
                {
                    error: 'required',
                    message: "Surname is required"
                },
                {
                    error: 'maxlength',
                    message: "Surname cannot be longer than 100 characters"
                }
            ]
        }
    ];

    constructor(private router: Router, private carerService: CarerService, private userService: UserService) {}

    ngOnInit()
    {
        //protection against missing steps
        // if(this.carerService.registerStep < this.carerService.availableSteps.PERSONAL_DETAILS)
        //     this.router.navigate(["/carer/register/terms"]);

        this.form = new FormGroup({
            email: new FormControl(null,
                [ Validators.required, Validators.email ],
                handleUniqueValidator(this.userService.checkEmailUniqueness.bind(this.userService))
            ),
            phone_number: new FormControl(null,
                [ Validators.required, Validators.minLength(6), numbers ],
                handleUniqueValidator(this.userService.checkPhoneNumberUniqueness.bind(this.userService))
            ),
            first_name: new FormControl(null,[ Validators.required, Validators.maxLength(100), alpha ]),
            middle_name: new FormControl(null,[ Validators.maxLength(100), alpha ]),
            surname: new FormControl(null,[ Validators.required, Validators.maxLength(100), alpha ]),
            location_id : new FormControl(null),
        });
    }
    toggleAddress()
    {
        this.addressVisible = !this.addressVisible;
    }
}
