import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CareHomeService} from '../../../../../../services/care-home.service';
import {NotificationsService} from 'angular2-notifications';
import {Router} from '@angular/router';

@Component({
    selector: 'app-cancelation-popup',
    templateUrl: './cancelation-popup.component.html',
    styleUrls: ['./cancelation-popup.component.scss']
})
export class CancelationPopupComponent implements OnInit, AfterViewInit {
    @Input() type: string;
    @Output() closed = new EventEmitter();

    title = 'Cancel job';
    buttonLoading = false;

    constructor(private careHomeService: CareHomeService,
                private notificationService: NotificationsService,
                private router: Router) {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        $('#' + this.type + '_id').modal();
        $('#' + this.type + '_id').on('hidden.bs.modal', () => this.closed.emit(true));
    }

    onClose(): void {
        $('#' + this.type + '_id').modal('hide');
        this.closed.emit();
    }

    onCancelJob(): void {
        this.buttonLoading = true;
        this.careHomeService.cancelJob(this.careHomeService.jobDetails._id)
            .subscribe(
                response => {
                    this.buttonLoading = false;
                    console.log('Cancel job success response', response);
                    this.notificationService.success('Job cancelled');
                    $('#' + this.type + '_id').modal('hide');
                    this.router.navigate(['/care-home-upcoming-jobs']);
                },
                error => {
                    this.buttonLoading = false;
                    console.log('Cancel job error response', error);
                }
            );
    }

}
