import { Component, signal } from '@angular/core';
import { SearchComponent } from "../search/search.component";
import { LibraryComponent } from "../library/library.component";
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SearchComponent, LibraryComponent, RouterOutlet, RouterLink, NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private service: AuthService) { }

  isSearchClicked = false;

  onSearch() {
    this.service.setSearchClick(true);
  }

}
