import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiService} from '../../../../../services/api.service';
import {NotificationsService} from 'angular2-notifications';

@Component({
    selector: 'app-blocked-carers',
    templateUrl: './blocked-carers.component.html',
    styleUrls: ['./blocked-carers.component.scss']
})
export class BlockedCarersComponent implements OnInit, AfterViewInit {
    @Input() carerId: string;
    @Input() type: string;
    @Input() blockedCarers: any[] = [];
    @Output() closed = new EventEmitter();
    @Output() reload = new EventEmitter();

    title = 'Blocked carers';
    buttonLoading = false;

    constructor(private apiService: ApiService,
                private notificationService: NotificationsService) {
    }

    ngOnInit() {
        console.log('Blocked carers', this.blockedCarers);
    }

    ngAfterViewInit() {
        $('#' + this.type + '_id').modal();
        $('#' + this.type + '_id').on('hidden.bs.modal', () => this.closed.emit(true));
    }

    onRemoveCarer(carerId: string): void {
        this.buttonLoading = true;
        this.apiService.removeCarerFromBlocked(carerId)
            .subscribe(
                response => {
                    this.buttonLoading = false;
                    this.notificationService.success('Carer successfully unblocked');
                    this.reload.emit();
                },
                error => {
                    console.log('Unblock carer error response', error);
                }
            );
    }

}
