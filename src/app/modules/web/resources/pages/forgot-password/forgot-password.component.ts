import {AfterViewInit, Component, EventEmitter, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {HttpErrorResponse} from '@angular/common/http';
import {getMessageError} from '../../../../../utilities/form.utils';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements AfterViewInit {
    @Output() closed: EventEmitter<boolean> = new EventEmitter<boolean>();
    inProgress = false;
    error = '';
    sent = false;

    constructor(private userService: UserService) {
    }

    ngAfterViewInit() {
        $('#forgot_password').modal();
        $('#forgot_password').on('hidden.bs.modal', () => this.closed.emit(true));
    }

    onForgotPassword(form: NgForm) {
        this.inProgress = true;
        this.userService
            .forgotPassword(form.value.email)
            .subscribe(() => {
                    this.sent = true;
                    this.inProgress = false;
                },
                (error: HttpErrorResponse) => {
                    this.error = getMessageError(error);
                    this.inProgress = false;
                });
    }

}
