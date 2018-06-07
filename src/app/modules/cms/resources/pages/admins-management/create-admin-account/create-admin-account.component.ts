import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {alpha, equalToFieldValue, fileSize, fileType, numbers, password} from '../../../../../../utilities/validators';
import {
    getMessageError,
    handleUniqueValidator,
    handleValidationErrorMessage,
    handleValidationStateClass
} from '../../../../../../utilities/form.utils';
import {CareHomesService} from '../../../../services/care-homes.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {AddressDetail} from '../../../../../web/models/address/address-detail.model';
import {AdminsManagementService} from '../../../../services/admins-management.service';
import {NotificationsService} from 'angular2-notifications';





@Component({
    selector: 'app-create-admin-account',
    templateUrl: './create-admin-account.component.html',
    styleUrls: ['./create-admin-account.component.scss']
})
export class CreateAdminAccountComponent implements OnInit {

    // form config
    form: FormGroup;
    formUtils = {handleValidationStateClass, handleValidationErrorMessage};
    inProgress = false;
    private maxFileSizeMB = 10;
    error = '';


    messages = [
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
            field: 'first_name',
            errors: [
                {
                    error: 'required',
                    message: 'First name is required'
                },
                {
                    error: 'alpha',
                    message: 'First name can contain only alphabetical characters'
                },
                {
                    error: 'maxlength',
                    message: 'First name annot be longer than 100 characters'
                },
                {
                    error: 'pattern',
                    message: 'Spaces is not allowed, field can contain only alphabetical characters'
                }
            ]
        },
        {
            field: 'surname',
            errors: [
                {
                    error: 'required',
                    message: 'Last name is required'
                },
                {
                    error: 'alpha',
                    message: 'Last name can contain only alphabetical characters'
                },
                {
                    error: 'maxlength',
                    message: 'Last name cannot be longer than 100 characters'
                },
                {
                    error: 'pattern',
                    message: 'Spaces is not allowed, field can contain only alphabetical characters'
                }
            ]
        },
    ];


    constructor(private route: ActivatedRoute, private adminsManagementService: AdminsManagementService, private router: Router, private notificationService: NotificationsService) {
    }

    ngOnInit() {
        this.createAdminForm();
    }

    createAdminForm() {
        this.form = new FormGroup({
            email: new FormControl(null, [Validators.required, Validators.email]),
            first_name: new FormControl(null, [Validators.required, Validators.pattern('^[A-z]+$')]),
            surname: new FormControl(null, [Validators.required, Validators.pattern('^[A-z]+$')]),
            password: new FormControl(null, [Validators.required, Validators.minLength(6), password]),
            password_confirm: new FormControl(null, [Validators.required]),
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


    }


    onSubmit() {
        if (this.form.valid) {
            this.inProgress = true;
            this.adminsManagementService
                .addNewAdminAccount(this.form.get('email').value, this.form.get('first_name').value, this.form.get('surname').value, this.form.get('password').value)
                .subscribe(() => {
                        this.inProgress = false;
                        this.router.navigate(['admin/admins-management']);
                        this.notificationService.success('Admin account created successfully');
                    },
                    (error: HttpErrorResponse) => {
                        this.error = getMessageError(error);
                        this.inProgress = false;
                    });
        }
    }


}
