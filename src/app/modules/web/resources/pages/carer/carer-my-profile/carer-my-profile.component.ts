import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {CarerProfileResponse} from '../../../../models/carer-profile/carer-profile-response';
import {CarerProfileService} from '../../../../services/carer-profile.service';
import {FormControl, FormGroup} from '@angular/forms';
import {NotificationsService} from 'angular2-notifications';
import {AuthService} from '../../../../services/auth.service';
import {ApiService} from '../../../../services/api.service';

@Component({
    selector: 'app-carer-my-profile',
    templateUrl: './carer-my-profile.component.html',
    styleUrls: ['./carer-my-profile.component.scss']
})
export class CarerMyProfileComponent implements OnInit, OnDestroy {
    loading = true;
    showEditEmail = false;
    showChangePassword = false;
    showChangeProfileImage = false;
    form: FormGroup;

    getProfileSub: Subscription;
    updateProfileSub: Subscription;

    constructor(public carerProfileService: CarerProfileService,
                private notificationService: NotificationsService,
                public authService: AuthService,
                private apiService: ApiService) {
    }

    ngOnInit() {
        this.getCarerProfile();
        this.createDetailsForm();
    }

    ngOnDestroy() {
        this.getProfileSub.unsubscribe();
        if (this.updateProfileSub) {
            this.updateProfileSub.unsubscribe();
        }
    }

    onUpdateData(): void {
        this.getCarerProfile();
    }

    onUpdateProfile(): void {
        const data = this.form.value;
        data.max_job_distance = +data.max_job_distance;
        console.log('Update profile passed data', data);
        this.carerProfileService.updateCarerProfile(data)
            .subscribe(
                response => {
                    console.log('Update carer profie success response', response);
                    this.getCarerProfile();
                    this.notificationService.success('Carer profile', 'Successfully updated');
                },
                error => {
                    console.log('Update care profile error response', error);
                }
            );
    }

    onResendEmail(): void {
        this.apiService.resendEmail()
            .subscribe(
                response => {
                    console.log('Resend email success respone', response);
                    this.notificationService.success('Success', 'Email verification resend');
                },
                error => {
                    console.log('Resend email error response', error);
                }
            );
    }

    private createDetailsForm(): void {
        this.form = new FormGroup({
            'max_job_distance': new FormControl(null),
            'city': new FormControl(null),
            'postal_code': new FormControl(null),
            'address_line_1': new FormControl(null),
            'address_line_2': new FormControl(null),
            'company': new FormControl(null),
            'phone_number': new FormControl(null)
        });
    }

    private setUpDetailsForm(): void {
        this.form.controls['max_job_distance'].setValue(this.carerProfileService.carerProfile.carer.max_job_distance);
        this.form.controls['city'].setValue(this.carerProfileService.carerProfile.address.city);
        this.form.controls['postal_code'].setValue(this.carerProfileService.carerProfile.address.postal_code);
        this.form.controls['address_line_1'].setValue(this.carerProfileService.carerProfile.address.address_line_1);
        this.form.controls['address_line_2'].setValue(this.carerProfileService.carerProfile.address.address_line_2);
        this.form.controls['company'].setValue(this.carerProfileService.carerProfile.address.company);
        this.form.controls['phone_number'].setValue(this.carerProfileService.carerProfile.phone_number);
        console.log('Phone number', this.carerProfileService.carerProfile.phone_number);
    }

    private getCarerProfile(): void {
        this.loading = true;
        this.getProfileSub = this.carerProfileService.getCarerProfile()
            .subscribe(
                (response: CarerProfileResponse) => {
                    this.loading = false;
                    console.log('GetCarerProfile success response', response);
                    this.carerProfileService.carerProfile = response;
                    this.setUpDetailsForm();
                },
                error => {
                    this.loading = false;
                    console.log('Get carer profile error response', error);
                }
            );
    }

}
