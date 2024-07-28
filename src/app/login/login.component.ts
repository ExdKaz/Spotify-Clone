import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  constructor(private service: AuthService) { }

  ngOnInit() {
    if (window.location.hash === null) {
      this.getTokenUrl();
    } else {
      localStorage.removeItem('token')
    }
  }

  login() {
    window.location.href = this.service.authorize();
  }

  getTokenUrl() {
    const token = this.service.getTokenUrl();
    if (token) {
      this.service.defineAccessToken(token)
    }
  }
}
