import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthService} from '../../../../../services/auth.service';

@Component({
    selector: 'app-see-profile-pictrue',
    templateUrl: './see-profile-pictrue.component.html',
    styleUrls: ['./see-profile-pictrue.component.scss']
})
export class SeeProfilePictrueComponent implements OnInit, AfterViewInit {
    @Input() type: string;
    @Input() url: string;
    @Output() closed = new EventEmitter();

    title = 'Profile picture';

    constructor(private authService: AuthService) {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        $('#' + this.type + '_id').modal();
        $('#' + this.type + '_id').on('hidden.bs.modal', () => this.closed.emit(true));
    }

    getPictureUrl(): string {
        return this.url ? `${this.url}?access-token=${this.authService.getAccessToken()}` : '';
    }

}
