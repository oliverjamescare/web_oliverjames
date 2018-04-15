import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../../services/auth.service';
import {CarerService} from '../../../../services/carer.service';

@Component({
    selector: 'app-carer-home',
    templateUrl: './carer-home.component.html',
    styleUrls: ['./carer-home.component.scss']
})
export class CarerHomeComponent implements OnInit {
    jobsDue: number;
    newJobs: number;
    activated: boolean;

    constructor(private router: Router,
                private authService: AuthService,
                private carerService: CarerService) {
    }

    ngOnInit() {
        this.checkActivation();
        this.getHomeScreenInfo();
    }

    showLogoutPopup() {
        $('#logout').modal();
    }

    onLogout() {
        this.authService.logout();
        $('#logout').modal('hide').on('hidden.bs.modal', () => this.router.navigate(['/']));
    }

    checkActivation(): void {
        const auth = JSON.parse(sessionStorage.getItem('auth'));
        this.activated = auth.status === 'ACTIVE';
        console.log('Activated', this.activated);
    }

    private getHomeScreenInfo(): void {
        this.carerService.getHomeScreen()
            .subscribe(
                response => {
                    console.log('Home screen response', response);
                    this.jobsDue = response.jobs24;
                    this.newJobs = response.newJobs;
                },
                error => {
                    console.log('Home screen error response', error);
                }
            );
    }
}
