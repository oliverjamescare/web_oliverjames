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
    selector: 'app-edit-admin-account',
    templateUrl: './edit-admin-account.component.html',
    styleUrls: ['./edit-admin-account.component.scss']
})
export class EditAdminAccountComponent implements OnInit {

    // form config
    form: FormGroup;
    formUtils = {handleValidationStateClass, handleValidationErrorMessage};
    inProgress = false;
    private maxFileSizeMB = 10;
    error = '';
    adminId: string;
    adminDetails;



    constructor(private route: ActivatedRoute, private adminsManagementService: AdminsManagementService, private router: Router, private notificationService: NotificationsService) {
    }

    ngOnInit() {
        this.adminId = this.route.snapshot.params['id'];
        this.getAdminsDetails();
    }


    private getAdminsDetails(): void {
        const getOneActivity = (value) => {
            return value['_id'] === this.adminId;
        };
        this.adminsManagementService.getAdminDetails(1, 9999)
            .subscribe((response) => {
                this.adminDetails = response.results.find(getOneActivity);
                this.inProgress = false;
                this.form = new FormGroup({
                    email: new FormControl(this.adminDetails.email, [Validators.required]),
                    first_name: new FormControl(this.adminDetails.first_name, [Validators.required]),
                    surname: new FormControl(this.adminDetails.surname, [Validators.required]),
                });
                },
            );
    }


    onSubmit()
    {
        if (this.form.valid) {
            this.inProgress = true;
            this.adminsManagementService
                .updateAdminProfileList(this.adminId, this.form.get('email').value, this.form.get('first_name').value, this.form.get('surname').value)
                .subscribe(() => {
                        this.inProgress = false;
                        this.notificationService.success('Admin account updated successfully');
                    },
                    (error: HttpErrorResponse) => {
                        this.error = getMessageError(error);
                        this.inProgress = false;
                    });
        }
    }


}
