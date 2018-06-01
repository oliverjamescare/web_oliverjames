import { Admin } from '../models/admin.model';
import { Subject } from 'rxjs/Subject';

export class AuthService
{
    private admin: Admin;
    private token: string;
    private authenticated = false;
    authChanged: Subject<Admin> = new Subject();

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
            this.authChanged.next(admin);
        }
    }

    logout()
    {
        sessionStorage.removeItem("authAdmin");
        this.token = null;
        this.admin = null;
        this.authenticated = false;
        this.authChanged.next(this.admin);
    }

    getLoggedUser() : Admin
    {
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
}
