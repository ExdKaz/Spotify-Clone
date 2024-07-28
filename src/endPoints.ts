export class Endpoints {
    redirectUri = "http://localhost:4200/dashboard";
    tokenEndpointUri = "https://accounts.spotify.com/api/token";
    authorize = "https://accounts.spotify.com/authorize";
    CLIENT_ID = "943c6199358b41b9ae7c7325b9d43d8c";
    CLIENT_SECRET = "08fcd09e4eee4262a8d14e3ed6b8500b";
    scopes = [
        "user-follow-read",
        "user-library-read",
        "user-top-read",
        "user-follow-read",
    ];
    search = "https://api.spotify.com/v1";
    currentUser = 'https://api.spotify.com/v1/me';
    currentUsersPlaylist = "https://api.spotify.com/v1/me/playlists";
    currentUsersSavedAlbums = "https://api.spotify.com/v1/me/albums";
    getCurrentUsersFollowedArtist = "https://api.spotify.com/v1/me/following?type=artist";
    shows = "https://api.spotify.com/v1/shows?ids=";
    newReleases = "https://api.spotify.com/v1/browse/new-releases";
    featuredPlaylists = "https://api.spotify.com/v1/browse/featured-playlists";
    browseAll = "https://api.spotify.com/v1/browse/categories?limit=50";
    featurings = "https://api.spotify.com/v1/artists/";
}