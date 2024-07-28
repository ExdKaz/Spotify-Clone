import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  constructor(private service: AuthService, private router: Router) { }

  currentUser: any;
  usersImg = '';
  isSearchClicked = false;
  query: string = '';
  results: any = [];

  ngOnInit() {
    this.getCurrentUser();
    this.getSearchInfo();
    this.monitorRouteChanges();
  }

  monitorRouteChanges() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const isDashboard = this.router.url.includes('/dashboard/(main:search)');
        if (!isDashboard) {
          this.service.setSearchClick(false);
        }
      }
    })
  }

  getSearchInfo() {
    this.service.isSearchVisible$.subscribe({
      next: (res) => {
        this.isSearchClicked = res
      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  onSearch() {
    if (this.query) {
      // Parse the query to determine the type
      const [type, searchTerm] = this.parseQuery(this.query);
      this.service.search(searchTerm, type).subscribe((data) => {
        this.results = this.handleResults(data, type);
        this.service.setQuery(this.query);
        this.service.setSearchResult(this.results);

      });
    } else {
      this.service.setQuery(this.query);
    }
  }

  parseQuery(query: string): [string, string] {
    const typeMap: { [key: string]: string } = {
      'track': 'track',
      'artist': 'artist',
      'album': 'album',
      'playlist': 'playlist',
      'show': 'show',
      'episode': 'episode',
      'audiobook': 'audiobook'
    };
    const parts = query.split(':');
    const type = typeMap[parts[0].toLowerCase()] || 'track'; // Default to 'track'
    const searchTerm = parts.length > 1 ? parts.slice(1).join(':') : query;

    return [type, searchTerm];
  }

  handleResults(data: any, type: string): any[] {
    switch (type) {
      case 'album':
        return data.albums.items;
      case 'artist':
        return data.artists.items;
      case 'playlist':
        return data.playlists.items;
      case 'track':
        return data.tracks.items;
      case 'show':
        return data.shows.items;
      case 'episode':
        return data.episodes.items;
      case 'audiobook':
        return data.audiobooks.items;
      default:
        return [];
    }
  }

  getCurrentUser() {
    this.service.getCurrentUser().subscribe({
      next: (response) => {
        this.currentUser = response;
        this.usersImg = response.images[0].url;
      }
    })
  }

}
