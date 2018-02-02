import { User } from '../models/user.model';
import { Subject } from 'rxjs/Subject';

export class AuthService
{
    private user: User;
    private token: string;
    private authenticated = false;
    authChanged: Subject<User> = new Subject();

    constructor()
    {
        var user;
        try
        {
            user = JSON.parse(sessionStorage.getItem("authAdmin"));
            this.login(user);
        }
        catch (error) {}
    }

    login(user: User)
    {
        if(user)
        {
            sessionStorage.setItem("authAdmin", JSON.stringify(user));
            this.authenticated = true;
            this.token = user.token;
            delete user["token"];
            this.user = user;
            this.authChanged.next(user);
        }
    }

    logout()
    {
        sessionStorage.removeItem("authAdmin");
        this.token = null;
        this.user = null;
        this.authenticated = false;
        this.authChanged.next(this.user);
    }

    getLoggedUser() : User
    {
        return this.user;
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
