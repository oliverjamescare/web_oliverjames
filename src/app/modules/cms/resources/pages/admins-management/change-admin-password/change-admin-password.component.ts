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
    selector: 'app-change-admin-password',
    templateUrl: './change-admin-password.component.html',
    styleUrls: ['./change-admin-password.component.scss']
})
export class ChangeAdminPasswordComponent implements OnInit {

    // form config
    form: FormGroup;
    formUtils = {handleValidationStateClass, handleValidationErrorMessage};
    inProgress = false;
    private maxFileSizeMB = 10;
    error = '';
    adminId: string;

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
        }
    ];

    constructor(private route: ActivatedRoute, private adminsManagementService: AdminsManagementService, private router: Router, private notificationService: NotificationsService) {
    }

    ngOnInit() {
        this.adminId = this.route.snapshot.params['id'];
        this.createForm();
    }

    createForm(): void {
        this.form = new FormGroup({
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
                .changeListAdminPassword(this.adminId, this.form.get('password').value)
                .subscribe(() => {
                        this.inProgress = false;
                        this.router.navigate(['admin/admins-management']);
                        this.notificationService.success('Admin password updated successfully');
                    },
                    (error: HttpErrorResponse) => {
                        this.error = getMessageError(error);
                        this.inProgress = false;
                    });
        }
    }


}
