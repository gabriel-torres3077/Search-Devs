import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  apiURL: string = `https://api.github.com/users`

  constructor(private http: HttpClient) { }

  public getUser(user: string) {
    return this.http.get(`${this.apiURL}/${user}`)
  }
  public getRepos(user: string){
    return this.http.get(`${this.apiURL}/${user}/repos`)
  }

}
