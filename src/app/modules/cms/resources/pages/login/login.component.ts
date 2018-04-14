import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import { HttpErrorResponse } from '@angular/common/http';
import { getMessageError } from '../../../../../utilities/form.utils';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit
{
    form: FormGroup;
    inProgress: boolean = false;
    error: string = '';

    constructor(private router: Router, private userService: AdminService) { }

    ngOnInit()
    {
        this.form = new FormGroup({
            email: new FormControl(null, Validators.required),
            password: new FormControl(null, Validators.required),
        });
    }

    onLogin()
    {
        if(this.form.valid)
        {
            this.inProgress = true;
            this.userService
                .login(this.form.get('email').value, this.form.get('password').value)
                .subscribe(() => {
                        this.inProgress = false;
                        this.router.navigate(["/admin"]);
                    },
                    (error: HttpErrorResponse) => {
                        this.error = getMessageError(error);
                        this.inProgress = false;
                    });
        }
    }

}
