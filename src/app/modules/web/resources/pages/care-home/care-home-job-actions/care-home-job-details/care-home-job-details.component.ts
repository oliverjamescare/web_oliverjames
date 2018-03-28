import {Component, OnInit} from '@angular/core';
import {CareHomeService} from '../../../../../services/care-home.service';
import {AuthService} from '../../../../../services/auth.service';
import {Router} from '@angular/router';

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
}
