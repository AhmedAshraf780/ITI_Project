import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {
  favourites: any[] = [];

  addFavourite(movie: any) {
    if (!this.favourites.some(fav => fav.id === movie.id)) {
      this.favourites.push(movie);
    }
  }

  getFavourites() {
    return this.favourites;
  }
}
