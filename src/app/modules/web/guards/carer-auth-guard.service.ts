import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';

@Injectable()
export class CarerAuthGuardService implements CanActivate
{
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | Observable<boolean> | boolean
    {
        if(this.authService.isAuthenticated())
        {
            if(this.authService.getLoggedUser().carer)
                return true;
            else
            {
                this.router.navigate(["/care-home-dashboard"]);
                return false;
            }
        }
        else
            this.router.navigate(["/"]);

    }
}
