import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TmdbService } from '../../services/tmdb.service';
import { FavouritesService } from '../../services/favourites.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  nowPlaying: any[] = [];

  constructor(
    private tmdbService: TmdbService,
    private favouritesService: FavouritesService,
    private router:Router,
  ) {}

  ngOnInit(): void {
    this.tmdbService.getNowPlaying().subscribe((res: any) => {
      this.nowPlaying = res;
    });
  }

  addToWatchlist(movie: any,icon:HTMLElement,event:MouseEvent) {
    event.stopPropagation();
    if (!this.favouritesService.favourites.some(fav => fav.id === movie.id)) {
      this.favouritesService.favourites.push(movie);
      icon.style.color = '#1abc9c';
    }
    else{
      const index = this.favouritesService.favourites.findIndex(fav => fav.id === movie.id)
      this.favouritesService.favourites.splice(index,1)
      icon.style.color ='#34495e';
    }
  }

  handleMovie(id:any){
    this.router.navigate([`movies/movie/${id}`])
  }

}
