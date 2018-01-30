
import { User } from '../models/user.model';
import { Token } from '../models/token.model';

export class AuthService
{
    private access_token: Token;
    private isAuthenticated = false;
    private user: User;

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
            this.isAuthenticated = true;
            this.access_token = user.access_token;
            delete user["access_token"];
            this.user = user;
        }
    }

    logout()
    {
        sessionStorage.removeItem("auth");
        this.isAuthenticated = false;
    }

    getLoggedUser() : User
    {
        return this.user;
    }

    getAccessToken(): Token
    {
        return this.access_token;
    }
}
