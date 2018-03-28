import {Component, OnInit} from '@angular/core';
import {CareHomeService} from '../../../../../services/care-home.service';
import {AuthService} from '../../../../../services/auth.service';

@Component({
    selector: 'app-care-home-carer-details',
    templateUrl: './care-home-carer-details.component.html',
    styleUrls: ['./care-home-carer-details.component.scss']
})
export class CareHomeCarerDetailsComponent implements OnInit {

    constructor(public careHomeService: CareHomeService,
                private authService: AuthService) {
    }

    ngOnInit() {
    }

    getProfileImage(): string {
        return `${this.careHomeService.jobDetails.carer.carer.profile_image}?access-token=${this.authService.getAccessToken().token}`
    }

}
