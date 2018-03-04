import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CarerJobService} from '../../../../../../services/carer-job.service';
import {NotificationsService} from 'angular2-notifications';

@Component({
    selector: 'app-confirmation-popup',
    templateUrl: './confirmation-popup.component.html',
    styleUrls: ['./confirmation-popup.component.scss']
})
export class ConfirmationPopupComponent implements OnInit {
    @Output() close = new EventEmitter();
    confirmed = false;

    constructor(private carerJobService: CarerJobService,
                private notificationService: NotificationsService) {
    }

    ngOnInit() {
    }

    onClosePopup(): void {
        this.close.emit();
    }

    onCheckBoxChange(): void {
        this.confirmed = !this.confirmed;
        console.log('Confirmed', this.confirmed);
    }

    onAcceptJob(): void {
        if (this.confirmed) {
            this.carerJobService.acceptJob(this.carerJobService.currentJobId)
                .subscribe(
                    response => {
                        console.log('Accept job success response', response);
                        this.notificationService.success('You accept this job');
                    }, error => {
                        console.log('Accept job error response', error);
                    }
                );
        } else {
            this.notificationService.warn('You have to confirm checkbox');
        }
    }

}
