import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CareHomeService} from '../../../../services/care-home.service';

@Component({
    selector: 'app-care-home-job-actions',
    templateUrl: './care-home-job-actions.component.html',
    styleUrls: ['./care-home-job-actions.component.scss']
})
export class CareHomeJobActionsComponent implements OnInit {
    jobId: string;

    constructor(private route: ActivatedRoute,
                private careHomeService: CareHomeService) {
    }

    ngOnInit() {
        this.route.params.subscribe(
            params => {
                this.jobId = params['id'];
                this.getJobDetails();
            }
        );
    }

    private getJobDetails(): void {
        this.careHomeService.getJobDetails(this.jobId)
            .subscribe(
                response => {
                    console.log('Get job details response', response);
                },
                error => {
                    console.log('Get job details error response', error);
                }
            );
    }

}
