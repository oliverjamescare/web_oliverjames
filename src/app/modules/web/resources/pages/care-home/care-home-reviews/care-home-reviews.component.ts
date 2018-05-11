import {Component, OnInit} from '@angular/core';
import {CareHomeService} from '../../../../services/care-home.service';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {NotificationsService} from 'angular2-notifications';
import {AuthService} from '../../../../services/auth.service';
import {CareHomeBookingService} from '../../../../services/care-home-booking.service';
import { getMessageError } from '../../../../../../utilities/form.utils';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-care-home-reviews',
    templateUrl: './care-home-reviews.component.html',
    styleUrls: ['./care-home-reviews.component.scss']
})
export class CareHomeReviewsComponent implements OnInit
{
    page = 1;
    pendingReviews: any[] = [];

    forms: Array<FormGroup> = [];
    inProgress: boolean = false;
    error: string = '';

    showBlockConfirmation = false;
    currentCarerId: string;

    constructor(private careHomeService: CareHomeService,
                private notificationService: NotificationsService,
                private authService: AuthService,
                private bookingService: CareHomeBookingService) {
    }

    ngOnInit()
    {
        this.getPendingReviews();
    }

    getProfileImage(carer): string
    {
        return carer.profile_image ? `${carer.profile_image}?access-token=${this.authService.getAccessToken().token}` : '../../../../assets/images/placeholder.jpg';
    }

    openConfirmationPopup(carerId): void {
        this.currentCarerId = carerId;
        this.showBlockConfirmation = true;
    }

    onRateChange(): void {}

    private getPendingReviews(): void
    {
        this.careHomeService.getPendingReviews(this.page)
            .subscribe(response => {
                    this.pendingReviews = response.results;
                    this.createForms();
                }
            );
    }

    private createForms(): void
    {
        this.pendingReviews.forEach(() => {
            const form = new FormGroup({
                rate: new FormControl(null, Validators.required),
                description: new FormControl(null, Validators.required)
            });

            this.forms.push(form);
        });
    }

    onSubmit(form: FormGroup, jobId: string): void
    {
        if(form.valid)
        {
            this.inProgress = true;
            this.careHomeService
                .reviewJobCarer(jobId, form.get("rate").value, form.get("description").value)
                .subscribe(
                    response => {
                        this.notificationService.success('Your rating has been sent for review');
                        this.inProgress = false;
                        form.reset();
                        this.getPendingReviews();
                    },
                    (error: HttpErrorResponse) => {
                        this.notificationService.error(getMessageError(error));
                        this.inProgress = false;
                    });
        }
    }

    addCarerToBlocked(carerId: string): void
    {
        this.careHomeService.addCarerToBlocked(carerId)
            .subscribe(
                response => {
                    console.log('Add carer to blocked success response', response);
                    this.notificationService.success('Carer blocked');
                },
                error => {
                    console.log('Add carer to blocked error response', error);
                }
            );
    }

}
