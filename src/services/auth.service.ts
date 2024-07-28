import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Endpoints } from '../endPoints';
import { Router } from '@angular/router';
import Spotify from 'spotify-web-api-js'
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  spotifyApi: Spotify.SpotifyWebApiJs = null;
  constructor(private http: HttpClient, private router: Router) {
    this.spotifyApi = new Spotify();
    this.accessToken = this.getTokenUrl();
    this.getCurrentUser();
  }

  authInfo = new Endpoints();
  accessToken: string = '';

  private searchSubject = new BehaviorSubject<boolean>(false);
  isSearchVisible$ = this.searchSubject.asObservable();

  private searchSub = new BehaviorSubject<any>([]);
  searchResult$ = this.searchSub.asObservable();

  private querySubject = new BehaviorSubject<string>('');
  query$ = this.querySubject.asObservable();

  setSearchClick(value: boolean) {
    this.searchSubject.next(value);
  }

  setSearchResult(result: any) {
    this.searchSub.next(result);
  }

  setQuery(query: string) {
    this.querySubject.next(query);
  }

  authorize() {
    const authEndPoint = `${this.authInfo.authorize}?`;
    const clientId = `client_id=${this.authInfo.CLIENT_ID}&`;
    const redirectUrl = `redirect_uri=${this.authInfo.redirectUri}&`;
    const scope = `scope=${this.authInfo.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;
    return authEndPoint + clientId + redirectUrl + scope + responseType;
  }

  getTokenUrl() {
    if (!window.location.hash) {
      return '';
    }
    const params = window.location.hash.substring(1).split('&');
    return params[0].split('=')[1];
  }

  defineAccessToken(token: string) {
    this.spotifyApi.setAccessToken(token);
    localStorage.setItem('token', token);
  }

  getCurrentUser(): Observable<any> {
    let parameters = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.accessToken
      }
    }
    return this.http.get(this.authInfo.currentUser, parameters);
  }

  getCurrentUsersPlaylists(): Observable<any> {
    let parameters = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.accessToken
      }
    }
    return this.http.get(this.authInfo.currentUsersPlaylist, parameters);
  }


  getCurrentUsersArtists(limit?: number): Observable<any> {
    let parameters = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.accessToken,
      }
    }
    if (limit === undefined) {
      return this.http.get(this.authInfo.getCurrentUsersFollowedArtist, parameters);
    } else {
      return this.http.get(this.authInfo.getCurrentUsersFollowedArtist + '&limit=' + limit, parameters);
    }

  }


  getCurrentUsersAlbums(): Observable<any> {
    let parameters = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.accessToken
      }
    }
    return this.http.get(this.authInfo.currentUsersSavedAlbums, parameters);
  }

  getShowLists(): Observable<any> {

    let parameters = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.accessToken
      }
    }
    return this.http.get(this.authInfo.shows, parameters);
  }

  getAllShows(): Observable<any> {
    let parameters = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.accessToken
      }
    }
    return this.http.get('https://api.spotify.com/v1/search?q=remaster%2520track%3ADoxy%2520artist%3AMiles%2520Davis&type=show', parameters)
  }

  getNewReleases(): Observable<any> {
    let parameters = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.accessToken
      }
    }
    return this.http.get(this.authInfo.newReleases, parameters)
  }

  getFeaturedPlaylists(): Observable<any> {
    let parameters = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.accessToken
      }
    }
    return this.http.get(this.authInfo.featuredPlaylists, parameters)
  }

  browseAll(): Observable<any> {
    let parameters = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.accessToken
      }
    }
    return this.http.get(this.authInfo.browseAll, parameters);
  }

  search(query: string, type: string = 'track,artist,album,playlist,show,episode,audiobook'): Observable<any> {
    const url = `${this.authInfo.search}/search?q=${encodeURIComponent(query)}&type=${type}&limit=3`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken}`
    });
    return this.http.get(url, { headers }).pipe(
      map((data: any) => data)
    );
  }

  getFeaturings(id: string): Observable<any> {
    let parameters = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.accessToken
      }
    }
    return this.http.get(`${this.authInfo.featurings}${id}/related-artists`, parameters)
  }
}
