import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  constructor(private service: AuthService) { }

  allBrowses: any = [];
  searchResult: any;
  show = true;
  query: string = '';
  allSearchResult: any;
  featuringArtists: any;

  ngOnInit() {
    this.browseAll();
    this.getSearchResult();
  }

  browseAll() {
    this.service.browseAll().subscribe({
      next: (response) => {
        this.allBrowses = response.categories.items;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getSearchResult() {

    this.service.query$.subscribe({
      next: (query) => {
        this.query = query;
        if (query === '') {
          this.show = true;
        } else {
          this.show = false;
        }
      }
    })

    let id: string = '';

    this.service.searchResult$.subscribe({
      next: (res) => {
        this.searchResult = res[0];
        if (res[0]) {
          id = res[0].artists[0].id;
          this.getFeaturings(id);
          this.allSearchResult = res;
        }
      }
    })
  }
  getFeaturings(id: string) {
    if (id !== '') {
      this.service.getFeaturings(id).subscribe({
        next: (res) => {
          this.featuringArtists = res.artists;
        }
      })
    }
  }
}
