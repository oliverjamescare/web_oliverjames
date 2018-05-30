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
                }
            ]
        },
    ];

    constructor(private adminsManagementService: AdminsManagementService, private router: Router, private notificationService: NotificationsService) {
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
                        email: new FormControl(data.email, [Validators.required]),
                        first_name: new FormControl(data.first_name, [Validators.required]),
                        surname: new FormControl(data.surname, [Validators.required]),
                    });
                },
                (error: HttpErrorResponse) => {
                    this.error = getMessageError(error);
                    this.inProgress = false;
                });
    }


    onSubmit()
    {
        if (this.form.valid) {
            this.inProgress = true;
            this.adminsManagementService
                .updateAdminProfile(this.form.get('email').value, this.form.get('first_name').value, this.form.get('surname').value)
                .subscribe(() => {
                        this.inProgress = false;
                        this.notificationService.success('Your admin password updated successfully');
                    },
                    (error: HttpErrorResponse) => {
                        this.error = getMessageError(error);
                        this.inProgress = false;
                    });
        }
    }


}
