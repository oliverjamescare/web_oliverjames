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
import {Router} from '@angular/router';
import {AddressDetail} from '../../../../../web/models/address/address-detail.model';
import {AdminsManagementService} from '../../../../services/admins-management.service';
import {NotificationsService} from 'angular2-notifications';
import {AuthService} from '../../../../services/auth.service';


@Component({
    selector: 'app-edit-my-admin-account',
    templateUrl: './edit-my-admin-account.component.html',
    styleUrls: ['./edit-my-admin-account.component.scss']
})
export class EditMyAdminAccountComponent implements OnInit {

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
                    message: 'Field can contain only alphabetical characters'
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
                    message: 'Field can contain only alphabetical characters'
                }
            ]
        },
    ];

    constructor(private authService: AuthService, private adminsManagementService: AdminsManagementService, private router: Router, private notificationService: NotificationsService) {
    }

    ngOnInit() {
        this.createForm();
    }

    createForm(): void {
        this.adminsManagementService
            .getAdminProfile()
            .subscribe((data) => {
                    this.inProgress = false;
                    this.form = new FormGroup({
                        email: new FormControl(data.email, [Validators.required, Validators.email]),
                        first_name: new FormControl(data.first_name, [Validators.required, Validators.pattern('^[a-zA-Z\\s]*$')]),
                        surname: new FormControl(data.surname, [Validators.required, Validators.pattern('^[a-zA-Z\\s]*$')]),
                        role: new FormControl(data.role, []),
                    });
                },
                (error: HttpErrorResponse) => {
                    this.error = getMessageError(error);
                    this.inProgress = false;
                });
    }

    getUserFriendlyRole() {
        switch (this.form.get('role').value) {
            case 'ADMIN':
                return 'Admin';
            case 'ADMIN_MANAGER':
                return 'Manager';
            case 'ADMIN_DIRECTOR':
                return 'Director';
            default:
                return '';
        }

    }


    onSubmit() {
        if (this.form.valid) {
            this.inProgress = true;
            this.adminsManagementService
                .updateAdminProfile(this.form.get('email').value, this.form.get('first_name').value, this.form.get('surname').value)
                .subscribe(() => {
                        this.inProgress = false;
                        let adminStorage = JSON.parse(sessionStorage.getItem('authAdmin'));
                        adminStorage.first_name = this.form.get('first_name').value;
                        adminStorage.surname = this.form.get('surname').value;
                        adminStorage.email = this.form.get('email').value;
                        sessionStorage.setItem("authAdmin", JSON.stringify(adminStorage));
                        this.authService.changeAdminData(true);

                        this.notificationService.success('Your admin account updated successfully');
                    },
                    (error: HttpErrorResponse) => {
                        this.error = getMessageError(error);
                        this.inProgress = false;
                    });
        }
    }


}
