import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.model';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: [ './dashboard.component.scss' ]
})
export class DashboardComponent implements OnInit
{
    user: User;
    constructor(private router: Router, private authService: AuthService) { }

    ngOnInit()
    {
        this.user = this.authService.getLoggedUser();
    }

    onLogout(event: Event)
    {
        event.preventDefault();
        this.authService.logout();
        this.router.navigate(["/admin","login"]);
    }
}
