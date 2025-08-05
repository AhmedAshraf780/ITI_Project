import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { WatchlistComponent } from './pages/watchlist/watchlist.component';
import { Movie } from './pages/movie/movie';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'movies/movie/:id', component: Movie},
  { path: 'search', component: SearchComponent },
  { path: 'watchlist', component: WatchlistComponent },
];
