import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CarerJobService} from '../../../../../../services/carer-job.service';
import {isUndefined} from 'util';
import {NotificationsService} from 'angular2-notifications';
import {Job} from '../../../../../../models/job.model';
import {Router} from '@angular/router';

@Component({
    selector: 'app-withdraw-popup',
    templateUrl: './withdraw-popup.component.html',
    styleUrls: ['./withdraw-popup.component.scss']
})
export class WithdrawPopupComponent implements OnInit {
    @Output() close = new EventEmitter();
    @Input() job: Job;
    confirmed = false;
    withdrawMessage = '';
    withdrawPassword = '';

    constructor(public carerJobService: CarerJobService,
                private notificationService: NotificationsService,
                private router: Router) {
    }

    ngOnInit() {
        console.log(this.checkPenndingJob());
    }

    onClosePopup(): void {
        this.close.emit();
    }

    onCheckBoxChange(): void {
        this.confirmed = !this.confirmed;
    }

    onConfirm(): void {
        this.carerJobService.withdrawJob(this.job.id, this.withdrawMessage, this.withdrawPassword)
            .subscribe(
                response => {
                    this.notificationService.success('Job withdrawn');
                    this.close.emit();
                    this.router.navigate(['/carer-dashboard']);
                },
                error => {
                    if (!isUndefined(error.error.errors[0])) {
                        this.notificationService.warn(error.error.errors[0].message);
                    }
                }
            );
    }

    checkPenndingJob(): boolean {
        if (Date.now() > this.job.start_date) {
            return true;
        }
        else {
            return false;
        }
    }
}
