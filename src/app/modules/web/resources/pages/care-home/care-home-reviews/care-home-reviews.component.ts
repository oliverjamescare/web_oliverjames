import {Component, OnInit} from '@angular/core';
import {CareHomeService} from '../../../../services/care-home.service';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {NotificationsService} from 'angular2-notifications';

@Component({
    selector: 'app-care-home-reviews',
    templateUrl: './care-home-reviews.component.html',
    styleUrls: ['./care-home-reviews.component.scss']
})
export class CareHomeReviewsComponent implements OnInit {
    page = 1;
    pendingReviews: any[] = [];

    form: FormGroup;

    constructor(private careHomeService: CareHomeService,
                private notificationService: NotificationsService) {
    }

    ngOnInit() {
        this.form = new FormGroup({
            ratings: new FormArray([])
        });
        this.getPendingReviews();
    }

    getProfileImage(): string {
        // getProfileImage(carer): string {
        //     return carer.profile_image ?
        //         `${carer.profile_image}?access-token=${this.authService.getAccessToken().token}`
        //         : '../../../../../assets/images/placeholder.jpg';
        // }
        return '../../../../assets/images/placeholder.jpg';
    }

    onRateChange(): void {
    }

    private getPendingReviews(): void {
        this.careHomeService.getPendingReviews(this.page)
            .subscribe(
                response => {
                    console.log('Get pending reviews success response', response);
                    this.pendingReviews = response.results;
                    this.createForm();
                },
                error => {
                    console.log('Get pending reviews error response', error);
                }
            );
    }

    private createForm(): void {
        const ratingsArr = new FormArray([]);
        this.pendingReviews.forEach(() => {
            ratingsArr.push(
                new FormGroup({
                    rate: new FormControl(null, Validators.required),
                    description: new FormControl(null, Validators.required)
                })
            );
        });
        this.form = new FormGroup({
            ratings: ratingsArr
        });
    }

    reviewJobCarer(index: number): void {
        const rate = (<FormArray>this.form.get('ratings')).controls[index].get('rate').value;
        const description = (<FormArray>this.form.get('ratings')).controls[index].get('description').value;
        console.log('Rate', rate);
        console.log('Description', description);
        this.careHomeService.reviewJobCarer(this.pendingReviews[index]._id, rate, description)
            .subscribe(
                response => {
                    console.log('Review job carer success response', response);
                    this.notificationService.success('Carer rated');
                    this.pendingReviews.splice(index, 1);
                },
                error => {
                    console.log('Review job carer error response', error);
                }
            );
    }

    addCarerToBlocked(carerId: string): void {
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
