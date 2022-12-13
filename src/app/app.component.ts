import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-sign-up-firebase';

  constructor(
    public authenticationService: AuthenticationService,
    private router: Router
  ) { }
  logout() {
    this.authenticationService.logout().subscribe(() => {
      this.router.navigate(['']);
    });
  }

}
