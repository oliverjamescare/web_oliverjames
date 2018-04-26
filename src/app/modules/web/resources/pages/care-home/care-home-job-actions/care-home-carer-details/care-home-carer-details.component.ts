import {Component, OnInit} from '@angular/core';
import {CareHomeService} from '../../../../../services/care-home.service';
import {AuthService} from '../../../../../services/auth.service';
import { ApiService } from '../../../../../services/api.service';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

@Component({
    selector: 'app-care-home-carer-details',
    templateUrl: './care-home-carer-details.component.html',
    styleUrls: ['./care-home-carer-details.component.scss']
})
export class CareHomeCarerDetailsComponent implements OnInit {

    inProgress: boolean = false;

    constructor(
        public careHomeService: CareHomeService,
        private authService: AuthService,
        private apiService: ApiService,
        private router: Router,
        private notificationService: NotificationsService
    ) {}

    ngOnInit() {
    }

    getProfileImage(): string {
        return `${this.careHomeService.jobDetails.carer.carer.profile_image}?access-token=${this.authService.getAccessToken().token}`
    }

    onCarerChangePopup()
    {
        $('#change_carer_modal_id').modal();
    }

    onCarerChange()
    {
        this.inProgress = true;
        this.apiService.requestCarerChange(this.careHomeService.jobDetails._id)
            .subscribe(
            response => {
                this.inProgress = false;
                this.router.navigate(['/care-home-dashboard']);
                this.notificationService.success('Success', 'Carer detached');
                $('#change_carer_modal_id').modal("hide");
            },
            error => {
                this.inProgress = false;
                this.notificationService.error('Error', '');
                $('#change_carer_modal_id').modal("hide");
            }
        );
    }

}
