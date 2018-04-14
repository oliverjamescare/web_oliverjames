import {Component, OnInit} from '@angular/core';
import {CareHomeService} from '../../../../../services/care-home.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-past-jobs-details',
    templateUrl: './past-jobs-details.component.html',
    styleUrls: ['./past-jobs-details.component.scss']
})
export class PastJobsDetailsComponent implements OnInit {
    jobId: string;

    constructor(private careHomeService: CareHomeService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params.subscribe(
            params => {
                this.jobId = params['id'];
                this.getDetails();
            }
        );
    }

    private getDetails(): void {
        this.careHomeService.getPastJobDetails(this.jobId)
            .subscribe(
                response => {
                }
            );
    }

}
