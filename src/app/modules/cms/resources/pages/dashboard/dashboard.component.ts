import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Admin } from '../../../models/admin.model';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: [ './dashboard.component.scss' ]
})
export class DashboardComponent implements OnInit
{
    admin: Admin;
    constructor(private router: Router, public authService: AuthService) { }

    ngOnInit()
    {
        this.admin = this.authService.getLoggedUser();
    }

    onLogout(event: Event)
    {
        event.preventDefault();
        this.authService.logout();
        this.router.navigate(["/admin","login"]);
    }
}
