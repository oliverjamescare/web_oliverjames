import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {CarerProfileResponse} from '../../../../models/carer-profile/carer-profile-response';
import {CarerProfileService} from '../../../../services/carer-profile.service';

@Component({
    selector: 'app-carer-my-profile',
    templateUrl: './carer-my-profile.component.html',
    styleUrls: ['./carer-my-profile.component.scss']
})
export class CarerMyProfileComponent implements OnInit, OnDestroy {
    loading = true;
    showChangePassword = false;

    getProfileSub: Subscription;

    constructor(public carerProfileService: CarerProfileService) {
    }

    ngOnInit() {
        this.getCarerProfile();
    }

    ngOnDestroy() {
        this.getProfileSub.unsubscribe();
    }

    private getCarerProfile(): void {
        this.loading = true;
        this.getProfileSub = this.carerProfileService.getCarerProfile()
            .subscribe(
                (response: CarerProfileResponse) => {
                    this.loading = false;
                    console.log('GetCarerProfile success response', response);
                    this.carerProfileService.carerProfile = response;
                },
                error => {
                    this.loading = false;
                    console.log('Get carer profile error response', error);
                }
            );
    }

}
