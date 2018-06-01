import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {JobsService} from '../../../../../services/jobs.service';
import {NotificationsService} from 'angular2-notifications';
import {HttpErrorResponse} from '@angular/common/http';
import {getMessageError} from '../../../../../../../utilities/form.utils';
import {CarersListResponse} from '../../../../../models/response/carers-list-response';
import {AdminsManagementService} from '../../../../../services/admins-management.service';

@Component({
    selector: 'app-delete-account',
    templateUrl: './delete-account.component.html',
    styleUrls: ['./delete-account.component.scss']
})
export class DeleteAccountComponent implements AfterViewInit {
    @Input() title: string;
    @Input() type: string;
    @Input() AdminId: string;
    @Input() listAdminId: string;
    @Output() closed = new EventEmitter();
    @Output() reload = new EventEmitter();

    inProgress: boolean = false;
    error: string = '';

    constructor(private adminsManagementService: AdminsManagementService, private notificationService: NotificationsService) {
    }

    ngAfterViewInit() {
        $('#' + this.type + '_id').modal();
        $('#' + this.type + '_id').on('hidden.bs.modal', () => this.closed.emit(true));

    }


    deleteAdminAccount(): void {
        this.adminsManagementService.deleteAdminAccount(this.listAdminId)
            .subscribe(() => {
                    this.notificationService.success('Admin account removed');
                    this.inProgress = false;
                    this.reload.emit();
                    $('#' + this.type + '_id').modal('hide');
                },
                (error: HttpErrorResponse) => {
                    this.error = getMessageError(error);
                    this.inProgress = false;
                });

    }

    cancelDeleteAdminAccount(): void {
        $('#' + this.type + '_id').modal('hide');
    }


}
