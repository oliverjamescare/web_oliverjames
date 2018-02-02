import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-web',
    templateUrl: './web.component.html',
    styleUrls: [ './web.component.scss' ]
})
export class WebComponent
{
    carerLogin: boolean = false;
    careHomeLogin: boolean = false;
    forgotPassword: boolean = false;

    initCarerLogin()
    {
        this.carerLogin = true;
    }
    initCareHomeLogin()
    {
        this.careHomeLogin = true;
    }

    onCarerClosed()
    {
        this.carerLogin = false;
    }

    onCareHomeClosed()
    {
        this.careHomeLogin = false;
    }
    onForgotPasswordOpen(type: string)
    {
        this.forgotPassword = true
    }

    onForgotPasswordClosed()
    {
        this.forgotPassword = false;
    }
}
