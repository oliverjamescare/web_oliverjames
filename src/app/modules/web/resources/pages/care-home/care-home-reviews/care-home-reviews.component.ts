import {Component, OnInit} from '@angular/core';
import {CareHomeService} from '../../../../services/care-home.service';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'app-care-home-reviews',
    templateUrl: './care-home-reviews.component.html',
    styleUrls: ['./care-home-reviews.component.scss']
})
export class CareHomeReviewsComponent implements OnInit {
    rating: FormControl;

    constructor(private careHomeService: CareHomeService) {
    }

    ngOnInit() {
        this.rating = new FormControl();
    }

    getProfileImage(): string {
        // getProfileImage(carer): string {
        //     return carer.profile_image ?
        //         `${carer.profile_image}?access-token=${this.authService.getAccessToken().token}`
        //         : '../../../../../assets/images/placeholder.jpg';
        // }
        return '../../../../assets/images/placeholder.jpg';
    }

    onRateChange(rate): void {
        console.log('Rate form', this.rating.value);
    }

}
