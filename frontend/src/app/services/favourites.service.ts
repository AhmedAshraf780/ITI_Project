import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {
  private readonly STORAGE_KEY = 'movie_watchlist';
  favourites: any[] = [];

  constructor() {
    this.loadFromStorage();          // <-- restore on every app restart
  }

  addFavourite(movie: any) {
    if (!this.favourites.some(fav => fav.id === movie.id)) {
      this.favourites.push(movie);
    }
  }

  getFavourites() {
    return this.favourites;
  }

  private loadFromStorage() {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      this.favourites = raw ? JSON.parse(raw) : [];
    } catch {
      this.favourites = [];
    }
  }

  private saveToStorage() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.favourites));
  }
}
