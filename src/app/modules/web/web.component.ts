import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {LoadingService} from './services/loading.service';

@Component({
    selector: 'app-web',
    templateUrl: './web.component.html',
    styleUrls: ['./web.component.scss']
})
export class WebComponent implements OnInit {
    carerLogin = false;
    careHomeLogin = false;
    forgotPassword = false;

    constructor(private router: Router, public loadingService: LoadingService) {
    }

    ngOnInit() {
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0);
        });
    }

    initCarerLogin() {
        this.carerLogin = true;
    }

    initCareHomeLogin() {
        this.careHomeLogin = true;
    }

    onCarerClosed() {
        this.carerLogin = false;
    }

    onCareHomeClosed() {
        this.careHomeLogin = false;
    }

    onForgotPasswordOpen(type: string) {
        this.forgotPassword = true;
    }

    onForgotPasswordClosed() {
        this.forgotPassword = false;
    }
}
