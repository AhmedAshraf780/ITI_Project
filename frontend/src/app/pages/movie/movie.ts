import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { TmdbService } from "../../services/tmdb.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FavouritesService } from "../../services/favourites.service";

@Component({
  selector: "app-movie",
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: "./movie.html",
  styleUrl: "./movie.css",
})
export class Movie {
  movie?: any;
  id: string | null = null;
  isFav:boolean = false;

  constructor(
    private tmdb: TmdbService,
    private favouritesService: FavouritesService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.isFav = this.favouritesService.favourites.some((fav) => fav.id === this.movie.id)
    this.id = this.route.snapshot.paramMap.get("id");
    if (this.id) {
      this.getMovie(this.id);
    }
  }

  getMovie(id:string) {
    this.tmdb.getMovie(id).subscribe((res: any) => {
      this.movie = res.data;
    });
  }
  addToWatchlist(movie: any, icon: HTMLElement, event: MouseEvent) {
    event.stopPropagation();
    if (!this.favouritesService.favourites.some((fav) => fav.id === movie.id)) {
      this.favouritesService.favourites.push(movie);
      icon.style.color = "red";
    } else {
      const index = this.favouritesService.favourites.findIndex((fav) =>
        fav.id === movie.id
      );
      this.favouritesService.favourites.splice(index, 1);
      icon.style.color = "white";
    }
  }
}
