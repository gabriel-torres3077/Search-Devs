import { GithubService } from 'src/app/services/github.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private  gitHubService: GithubService
  ) { }

    loading: boolean = false;
    user: any;
    repos: any;
    links: string[][] = [];

  ngOnInit(): void {
    let username: string;
    this.route.paramMap.subscribe((param) => {
      username = String(param.get('string'));
      this.gitHubService.getUser(username).subscribe((res) => {
        this.set_user(res);
        this.get_repositories();
      })
    })

  }
  set_user(user: any){
    this.user = user;
    this.generate_links();
    this.loading = true;
    console.log(this.user)
    console.log(this.loading)
  }
  get_repositories(){
    this.gitHubService.getRepos(this.user.login).subscribe(
      (res) => {
        this.repos = res;
        console.log(this.repos)
      },
      (err) => {
        alert(err.error.message);
      }
    )
  }
  generate_links(){
    if (this.user.company) {
      this.links.push([``, String(this.user.company)]);
    }
    if (this.user.location) {
      this.links.push([``, this.user.location]);
    }
    if (this.user.email) {
      this.links.push([this.user.email, this.user.email]);
    }
    if (this.user.blog) {
      this.links.push([this.user.blog, this.user.blog]);
    }
    if (this.user.twitter_username) {
      this.links.push([`https://twitter.com/${this.user.twitter_username}`, String(this.user.twitter_username)]);
    }

    console.log(this.links)
  }
}
