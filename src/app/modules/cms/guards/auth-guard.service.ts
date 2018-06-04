import {Injectable} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | Observable<boolean> | boolean {
        if (this.authService.isAuthenticated()) {
            if (this.authService.getCurrentRole() >= this.authService.getCurrentRole(route.data.expectedRole)) {
                console.log('restricted');
                return true;
            }
            else {
                console.log('lower rule');
                this.router.navigate(['/admin']);
            }
        }
        else
            this.router.navigate(['/admin', 'login']);
    }
}
