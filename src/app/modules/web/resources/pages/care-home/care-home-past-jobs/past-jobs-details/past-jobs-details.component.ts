import {Component, OnInit} from '@angular/core';
import {CareHomeService} from '../../../../../services/care-home.service';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../../../../services/auth.service';

@Component({
    selector: 'app-past-jobs-details',
    templateUrl: './past-jobs-details.component.html',
    styleUrls: ['./past-jobs-details.component.scss']
})
export class PastJobsDetailsComponent implements OnInit {
    jobId: string;
    jobDetails: any;
    showBlockConfirmation = false;

    constructor(private careHomeService: CareHomeService,
                private route: ActivatedRoute,
                private authService: AuthService) {
    }

    ngOnInit() {
        this.route.params.subscribe(
            params => {
                this.jobId = params['id'];
                this.getDetails();
            }
        );
    }

    getProfileImage(): string {
        return this.jobDetails.carer.carer.profile_image ?
            `${this.jobDetails.carer.carer.profile_image}?access-token=${this.authService.getAccessToken().token}`
            : '../../../../../assets/images/placeholder.jpg';
    }


    getFloorPlanLink(link: string): string {
        if (link) {
            return `${link}?access-token=${this.authService.getAccessToken().token}`;
        }
        else {
            return null;
        }
    }

    getPdf(): string {
        return `${this.jobDetails.carer.acceptance_document}?access-token=${this.authService.getAccessToken().token}`;
    }

    getGoogleMapsLink(): string {
        const latitude = this.jobDetails.author.address.location.coordinates[0];
        const longitude = this.jobDetails.author.address.location.coordinates[1];
        return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    }

    private getDetails(): void {
        this.careHomeService.getPastJobDetails(this.jobId)
            .subscribe(
                response => {
                    console.log('Get past job details success response', response);
                    this.jobDetails = response;
                },
                error => {
                    console.log('Get past job details error response', error);
                }
            );
    }

}
