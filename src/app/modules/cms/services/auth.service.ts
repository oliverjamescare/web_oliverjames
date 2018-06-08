import { Admin } from '../models/admin.model';
import { Subject,  } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';


export class AuthService
{
    private admin: Admin;
    private token: string;
    private authenticated = false;
    private currentRole:string;
    authChanged: Subject<Admin> = new Subject();
    adminData$ = new BehaviorSubject<boolean>(true);

    constructor()
    {
        var admin;
        try
        {
            admin = JSON.parse(sessionStorage.getItem("authAdmin"));
            this.login(admin);
        }
        catch (error) {}
    }

    login(admin: Admin)
    {
        if(admin)
        {
            sessionStorage.setItem("authAdmin", JSON.stringify(admin));
            this.authenticated = true;
            this.token = admin.access_token.token;

            // delete admin.access_token.token;
            this.admin = admin;
            this.currentRole =  admin.role;
            this.authChanged.next(admin);
        }
    }

    editedAdminData(): Observable<boolean> {
        return this.adminData$.asObservable();
    }

    changeAdminData(change: boolean) {
        this.adminData$.next(change);
    }

    logout()
    {
        sessionStorage.removeItem("authAdmin");
        this.token = null;
        this.admin = null;
        this.authenticated = false;
        this.authChanged.next(this.admin);
    }

    getLoggedUser(): Admin
    {
        this.admin = JSON.parse(sessionStorage.getItem("authAdmin"));
        return this.admin;
    }

    getAccessToken(): string
    {
        return this.token;
    }

    isAuthenticated()
    {
        return this.authenticated;
    }

    getCurrentRole(currentRole = this.currentRole) {
        switch (currentRole) {
            case 'ADMIN':
                return 1;
            case 'ADMIN_MANAGER':
                return 2;
            case 'ADMIN_DIRECTOR':
                return 3;
            default:
                return 99;
        }
    }
}
