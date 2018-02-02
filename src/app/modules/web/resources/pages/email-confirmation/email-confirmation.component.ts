import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { getMessageError } from '../../../../../utilities/form.utils';

@Component({
    selector: 'app-email-confirmation',
    templateUrl: './email-confirmation.component.html',
    styleUrls: [ './email-confirmation.component.scss' ]
})
export class EmailConfirmationComponent implements OnInit
{
    constructor(private userService: UserService, private route: ActivatedRoute) { }
    message: string = "";
    error: boolean = false;

    ngOnInit()
    {
        const token = this.route.snapshot.queryParams["token"];
        this.userService
            .confirmEmail(token)
            .subscribe(() => {
                    this.message = "Email verified successfully!";
                    this.error = false;
                },
                (error: HttpErrorResponse) => {
                    this.message = getMessageError(error);
                    this.error = true;
                });
    }
}
