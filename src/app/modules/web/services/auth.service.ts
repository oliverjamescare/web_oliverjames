import { User } from '../models/user.model';
import { Token } from '../models/token.model';
import { Subject } from 'rxjs/Subject';

export class AuthService
{
    private access_token: Token;
    private authenticated = false;
    private user: User;
    authChanged: Subject<User> = new Subject();

    constructor()
    {
        var user;
        try
        {
            user = JSON.parse(sessionStorage.getItem("auth"));
            this.login(user);
        }
        catch (error) {}
    }

    login(user: User)
    {
        if(user)
        {
            sessionStorage.setItem("auth", JSON.stringify(user));
            this.authenticated = true;
            this.access_token = user.access_token;
            delete user["access_token"];
            this.user = user;
            this.authChanged.next(user);
        }
    }

    logout()
    {
        sessionStorage.removeItem("auth");
        this.access_token = null;
        this.user = null;
        this.authenticated = false;
        this.authChanged.next(this.user);
    }

    getLoggedUser() : User
    {
        return this.user;
    }

    getAccessToken(): Token
    {
        return this.access_token;
    }

    isAuthenticated()
    {
        return this.authenticated;
    }
}
