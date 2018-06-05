import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {ParameterizationService} from '../../../../services/parameterization.service';

@Component({
    selector: 'app-delete-account',
    templateUrl: './delete-account.component.html',
    styleUrls: ['./delete-account.component.scss']
})
export class DeleteAccountComponent {
    @Input() title: string;
    @Input() type: string;
    @Input() AdminId: string;
    @Input() listAdminId: string;
    @Output() closed = new EventEmitter();
    @Output() reload = new EventEmitter();
    usersRoles;


    inProgress: boolean = false;
    error: string = '';

    constructor(private parameterizationService: ParameterizationService) {
    }

}
