import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {

  constructor(private service: AuthService) { }

  artists: any = [];
  shows: any = [];
  newReleases: any = [];
  featuredPlaylists: any = [];

  ngOnInit() {
    this.getArtists();
    this.getAllShows();
    this.getNewReleases();
    this.getFeaturedPlaylists();
  }

  getArtists() {
    this.service.getCurrentUsersArtists(8).subscribe({
      next: (response) => {
        this.artists = response.artists;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getAllShows() {
    this.service.getAllShows().subscribe({
      next: (response) => {
        this.shows = response.shows.items;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getNewReleases() {
    this.service.getNewReleases().subscribe({
      next: (response) => {
        this.newReleases = response.albums.items;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getFeaturedPlaylists() {
    this.service.getFeaturedPlaylists().subscribe({
      next: (response) => {
        this.featuredPlaylists = response.playlists.items;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


}
