import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'spotify-clone';
  userData: any;

  constructor(private router: Router, private service: AuthService) { }

  ngOnInit() {
    this.getTokenUrl();
  }

  getTokenUrl() {
    if (window.location.hash) {
      const params = window.location.hash.substring(1).split('&');
      const token = params[0].split('=')[1];
      localStorage.setItem('token', token)
      this.service.getCurrentUser().subscribe({
        next: (response) => {
          this.userData = response
        }
      })
    } else {
      this.router.navigateByUrl('/login')
      localStorage.removeItem('token')
    }
  }


}
