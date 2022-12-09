import { GithubService } from 'src/app/services/github.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss',]
})
export class HomeComponent implements OnInit {
  form = this.fb.group({
    user: ['', Validators.required],
  });
  constructor(
    private githubService: GithubService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  ngOnInit(): void {
  }
  get_user(){

    if (this.form.get('user')?.value != '') {
      this.githubService.getUser(String(this.form.get('user')?.value)).subscribe(
        (res) => {
          this.router.navigate(['/user', String(this.form.get('user')?.value)]);
        },
        (err) => {
          this.message_popup(err.error.message)
        }
      )
    }
  }
  message_popup(message: string){
    this.snackBar.open(`${message}`, '', {
      duration: 2000,
      verticalPosition: this.verticalPosition,
      horizontalPosition: this.horizontalPosition,
      panelClass: ['purple-snackbar']
    });
  }
}
