import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiService} from '../../../../../services/api.service';
import {NotificationsService} from 'angular2-notifications';

@Component({
    selector: 'app-see-review',
    templateUrl: './see-review.component.html',
    styleUrls: ['./see-review.component.scss']
})
export class SeeReviewComponent implements OnInit, AfterViewInit {
    @Input() type: string;
    @Input() jobId: string;
    @Input() review: any;
    @Output() closed = new EventEmitter();

    title = 'Approve job review';

    constructor(private apiService: ApiService,
                private notificationService: NotificationsService) {
    }

    ngOnInit() {
        console.log('Job id', this.jobId);
    }

    ngAfterViewInit() {
        $('#' + this.type + '_id').modal();
        $('#' + this.type + '_id').on('hidden.bs.modal', () => this.closed.emit(true));
    }

    onApproveReview(status: string): void {
        this.apiService.approveJobReview(this.jobId, status)
            .subscribe(
                response => {
                    console.log('Approve review success response', response);
                    this.notificationService.success(`Review ${status.toLowerCase()}`);
                    $('#' + this.type + '_id').modal('hide');
                },
                error => {
                    console.log('Approve review error response', error);
                }
            );
    }

}
