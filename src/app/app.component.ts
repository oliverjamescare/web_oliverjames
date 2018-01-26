import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})

export class AppComponent
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
