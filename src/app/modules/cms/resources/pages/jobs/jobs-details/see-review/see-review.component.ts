import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiService} from '../../../../../services/api.service';
import {NotificationsService} from 'angular2-notifications';
import { HttpErrorResponse } from '@angular/common/http';
import { getMessageError } from '../../../../../../../utilities/form.utils';

@Component({
    selector: 'app-see-review',
    templateUrl: './see-review.component.html',
    styleUrls: ['./see-review.component.scss']
})
export class SeeReviewComponent implements OnInit, AfterViewInit {

    @Input() title: string;
    @Input() type: string;
    @Input() jobId: string;
    @Input() review: any;
    @Output() closed = new EventEmitter();
    @Output() reload = new EventEmitter();

    //form
    inProgress: boolean = false;
    error: string = '';

    stars: Array<number> = [];

    constructor(private apiService: ApiService, private notificationService: NotificationsService) {}

    ngOnInit(): void
    {
        this.stars = Array.from(Array(this.review.rate).keys())
    }

    ngAfterViewInit()
    {
        $('#' + this.type + '_id').modal();
        $('#' + this.type + '_id').on('hidden.bs.modal', () => this.closed.emit(true));
    }

    onApproveReview(status: string): void
    {
        this.apiService
            .approveJobReview(this.jobId, status)
            .subscribe(() =>
            {
                this.notificationService.success(`Review ${status.toLowerCase()}`);
                this.inProgress = false;
                this.reload.emit();
                $('#' + this.type + '_id').modal('hide');
            },
            (error: HttpErrorResponse) =>
            {
                this.error = getMessageError(error);
                this.inProgress = false;
            });
    }

}
