import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../../services/auth.service';

@Component({
    selector: 'app-carer-home',
    templateUrl: './carer-home.component.html',
    styleUrls: ['./carer-home.component.scss']
})
export class CarerHomeComponent implements OnInit {
    jobsDue: number;
    activated: boolean;

    constructor(private router: Router, private authService: AuthService) {
    }

    ngOnInit() {
        this.checkActivation();
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
}
