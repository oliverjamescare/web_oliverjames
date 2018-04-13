import {Component, OnInit} from '@angular/core';
import {CareHomeService} from '../../../../../services/care-home.service';
import {AuthService} from '../../../../../services/auth.service';
import {Router} from '@angular/router';
import {Job} from '../../../../../models/care-home-booking/job';

const HOUR_IN_MILLISECONDS = 3600000;

@Component({
    selector: 'app-care-home-job-details',
    templateUrl: './care-home-job-details.component.html',
    styleUrls: ['./care-home-job-details.component.scss']
})
export class CareHomeJobDetailsComponent implements OnInit {
    showCancelationPopup = false;

    constructor(public careHomeService: CareHomeService,
                private authService: AuthService,
                private router: Router) {
    }

    ngOnInit() {
    }

    getFloorPlanLink(link: string): string {
        return `${link}?access-token=${this.authService.getAccessToken().token}`;
    }

    onEditJob(): void {
        this.router.navigate(['/care-home-job-actions', this.careHomeService.jobDetails._id, 'edit']);
    }

    onCancelJob(): void {
        this.showCancelationPopup = true;
    }

    getDueIn(job: Job): string {
        const now = new Date();
        const diff = job.start_date - now.getTime();
        const hourDiff = Math.floor(diff / HOUR_IN_MILLISECONDS);
        if (hourDiff > 24) {
            return `${Math.ceil(hourDiff / 24)} day(s)`;
        } else {
            return hourDiff < 1 ? 'Less than hour' : `${hourDiff} hours`;
        }
    }
}
