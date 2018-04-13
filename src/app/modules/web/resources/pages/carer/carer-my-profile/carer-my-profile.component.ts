import {AfterViewInit, Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {CarerProfileResponse} from '../../../../models/carer-profile/carer-profile-response';
import {CarerProfileService} from '../../../../services/carer-profile.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NotificationsService} from 'angular2-notifications';
import {AuthService} from '../../../../services/auth.service';
import {ApiService} from '../../../../services/api.service';
import {Router} from '@angular/router';
import {} from 'googlemaps';
import {MapsAPILoader} from '@agm/core';
import {} from '@types/googlemaps';
import {GoogleService} from '../../../../services/google.service';
import {numbers} from '../../../../../../utilities/validators';

@Component({
    selector: 'app-carer-my-profile',
    templateUrl: './carer-my-profile.component.html',
    styleUrls: ['./carer-my-profile.component.scss']
})
export class CarerMyProfileComponent implements OnInit, OnDestroy {
    buttonLoading = false;
    form: FormGroup;

    // show hide modals
    showEditEmail = false;
    showChangePassword = false;
    showChangeProfileImage = false;
    showBankAccountForm = false;

    getProfileSub: Subscription;
    updateProfileSub: Subscription;

    constructor(public carerProfileService: CarerProfileService,
                private notificationService: NotificationsService,
                public authService: AuthService,
                private apiService: ApiService,
                private router: Router,
                private mapsAPILoader: MapsAPILoader,
                private ngZone: NgZone,
                private googleService: GoogleService) {
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

    onRoleChange(): void {
        this.router.navigate(['/carer-dashboard', 'contact']);
    }

    onUpdateData(): void {
        this.getCarerProfile();
    }

    onUpdateProfile(): void {
        this.buttonLoading = true;
        const data = this.form.value;
        data.max_job_distance = +data.max_job_distance;
        console.log('Update profile passed data', data);
        this.carerProfileService.updateCarerProfile(data)
            .subscribe(
                response => {
                    this.buttonLoading = false;
                    this.getCarerProfile();
                    this.notificationService.success('Carer profile', 'Successfully updated');
                },
                error => {
                    this.buttonLoading = false;
                    console.log('Update care profile error response', error);
                    this.notificationService.warn('Update carer profile failed');
                }
            );
    }

    onResendEmail(): void {
        this.apiService.resendEmail()
            .subscribe(
                response => {
                    console.log('Resend email success response', response);
                    this.notificationService.success('Success', 'Email verification resend');
                },
                error => {
                    console.log('Resend email error response', error);
                }
            );
    }

    passProfileUrl(): string {
        return this.carerProfileService.carerProfile.carer.profile_image ?
            this.carerProfileService.carerProfile.carer.profile_image + '?access-token=' + this.authService.getAccessToken().token : null;
    }

    private createDetailsForm(): void {
        this.form = new FormGroup({
            'max_job_distance': new FormControl(null, [Validators.required, Validators.min(0)]),
            'city': new FormControl(null, Validators.required),
            'postal_code': new FormControl(null, Validators.required),
            'address_line_1': new FormControl(null, Validators.required),
            'address_line_2': new FormControl(null),
            'phone_number': new FormControl(null, [
                Validators.required, Validators.minLength(6), numbers
            ])
        });

        this.setUpPca();
    }

    private setUpPca(): void {
        if (pca.load) {
            pca.load();
        }

        pca.on('load', (type, id, control) => {

            control.listen('populate', (address) => {
                console.log(address);
                this.form.patchValue({
                    postal_code: address['PostalCode'],
                    address_line_1: address['Line1'],
                    address_line_2: address['Line2'],
                    city: address['City']
                });
            });
        });
    }

    private setUpDetailsForm(): void {
        this.form.controls['max_job_distance'].setValue(this.carerProfileService.carerProfile.carer.max_job_distance);
        this.form.controls['city'].setValue(this.carerProfileService.carerProfile.address.city);
        this.form.controls['postal_code'].setValue(this.carerProfileService.carerProfile.address.postal_code);
        this.form.controls['address_line_1'].setValue(this.carerProfileService.carerProfile.address.address_line_1);
        this.form.controls['address_line_2'].setValue(this.carerProfileService.carerProfile.address.address_line_2);
        this.form.controls['phone_number'].setValue(this.carerProfileService.carerProfile.phone_number);
    }

    private getCarerProfile(): void {
        this.getProfileSub = this.carerProfileService.getCarerProfile()
            .subscribe(
                (response: CarerProfileResponse) => {
                    console.log('GetCarerProfile success response', response);
                    this.carerProfileService.carerProfile = response;
                    this.setUpDetailsForm();
                },
                error => {
                    console.log('Get carer profile error response', error);
                }
            );
    }

}


