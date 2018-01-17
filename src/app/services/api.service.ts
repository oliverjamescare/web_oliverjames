import { environment } from '../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class ApiService
{
    private endpoint: string;

    constructor(private httpClient: HttpClient)
    {
        this.endpoint = environment.api;
    }

    //posts
    // getPosts()
    // {
    //     return this.httpClient.get(this.endpoint + "/posts");
    // }
    //
    // addPost(data: Object = {})
    // {
    //     return this.httpClient.post(this.endpoint + "/posts", data);
    // }
}
