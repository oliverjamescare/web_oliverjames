import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {CarerJobService} from '../../../../../../services/carer-job.service';
import {isUndefined} from "util";
import {NotificationsService} from 'angular2-notifications';
import { Job } from '../../../../../../models/job.model';

@Component({
    selector: 'app-confirmation-popup',
    templateUrl: './confirmation-popup.component.html',
    styleUrls: ['./confirmation-popup.component.scss']
})
export class ConfirmationPopupComponent implements OnInit {
    @Output() close = new EventEmitter();
    @Input() job: Job;
    confirmed = false;

    constructor(public carerJobService: CarerJobService,
                private notificationService: NotificationsService) {
    }

    ngOnInit() {
    }

    onClosePopup(): void {
        this.close.emit();
    }

    onCheckBoxChange(): void {
        this.confirmed = !this.confirmed;
    }

    onConfirm(): void
    {
        this.carerJobService.acceptJob(this.job.id)
            .subscribe(
                response => {
                    this.notificationService.success('Job accepted');
                    this.close.emit();
                },
                error => {
                    if (!isUndefined(error.error.errors[0])) {
                        this.notificationService.warn(error.error.errors[0].message);
                    }
                }
            );
    }

}
