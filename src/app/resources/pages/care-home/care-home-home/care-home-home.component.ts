import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
    selector: 'app-care-home-home',
    templateUrl: './care-home-home.component.html',
    styleUrls: [ './care-home-home.component.scss' ]
})
export class CareHomeHomeComponent implements OnInit
{

    constructor(private router: Router, private authService: AuthService) { }

    ngOnInit()
    {
    }

    showLogoutPopup()
    {
        $('#logout').modal();
    }

    onLogout()
    {
        this.authService.logout();
        $('#logout').modal('hide').on('hidden.bs.modal', () => this.router.navigate([ '/' ]));
    }

}
