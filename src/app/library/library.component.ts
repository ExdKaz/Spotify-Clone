import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [TitleCasePipe],
  templateUrl: './library.component.html',
  styleUrl: './library.component.css'
})
export class LibraryComponent implements OnInit {

  constructor(private service: AuthService) { }

  lib: string = 'playlist';

  ngOnInit() {
    this.getLibrary(this.lib);
  }

  usersPlaylist: any;
  usersArtists: any;
  usersAlbums: any;
  library: any = [
    {
      name: "",
      type: "",
      owner: { display_name: "" },
      url: ''
    }
  ];


  getLibrary(lib: string) {
    if (lib === 'playlist') {
      this.service.getCurrentUsersPlaylists().subscribe({
        next: (response) => {
          this.library = response.items.map((item: any) => ({
            name: item.name,
            type: item.type,
            owner: item.owner.display_name,
            url: item.images[0].url
          }))
        },
        error: (error) => {
          console.log(error);
        }
      })
    } else if (lib === 'artists') {
      this.service.getCurrentUsersArtists().subscribe({
        next: (response) => {
          this.library = response.artists.items.map((item: any) => ({
            name: item.name,
            url: item.images[0].url
          }))
        },
        error: (error) => {
          console.log(error);

        }
      })
    } else {
      this.service.getCurrentUsersAlbums().subscribe({
        next: (response) => {
          this.library = response.items.map((item: any) => ({
            name: item.album.name,
            url: item.album.images[0].url,
            owner: item.album.artists[0].name
          }))
        },
        error: (error) => {
          console.log(error);

        }
      })
    }
  }

}
