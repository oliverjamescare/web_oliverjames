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

    constructor(private router: Router, private authService: AuthService) {
    }

    ngOnInit() {
    }

    showLogoutPopup() {
        $('#logout').modal();
    }

    onLogout() {
        this.authService.logout();
        $('#logout').modal('hide').on('hidden.bs.modal', () => this.router.navigate(['/']));
    }
}
