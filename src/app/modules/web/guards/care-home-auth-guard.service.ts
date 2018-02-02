import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CareHomeAuthGuardService implements CanActivate
{
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | Observable<boolean> | boolean
    {
        if(this.authService.isAuthenticated())
        {
            if (this.authService.getLoggedUser().care_home)
                return true;
            else
            {
                this.router.navigate(["/carer-dashboard"]);
                return false;
            }
        }
        else
            this.router.navigate([ "/" ]);

    }

}
