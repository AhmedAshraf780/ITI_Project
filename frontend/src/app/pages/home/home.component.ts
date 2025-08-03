import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TmdbService } from '../../services/tmdb.service';
import { FavouritesService } from '../../services/favourites.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  nowPlaying: any[] = [];

  constructor(private tmdbService: TmdbService, private favouritesService: FavouritesService) {}

  ngOnInit(): void {
    this.tmdbService.getNowPlaying().subscribe((res: any) => {
      this.nowPlaying = res.results;
    });
  }

  addToWatchlist(movie: any) {
    this.favouritesService.addFavourite(movie);
  }
}
