import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TmdbService } from "../../services/tmdb.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FavouritesService } from "../../services/favourites.service";

@Component({
  selector: "app-search",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
})
export class SearchComponent implements OnInit {
  query: string = "";
  results: any[] = [];

  constructor(
    private tmdbService: TmdbService,
    private route: ActivatedRoute,
    private router: Router,
    private favouritesService:FavouritesService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.query = params["q"] || "";
      if (this.query.trim()) {
        this.tmdbService.searchMovie(this.query.trim()).subscribe(
          (res: any) => {
            this.results = res;
          },
        );
      }
    });
  }

  searchMovie() {
    const trimmedQuery = this.query.trim();
    if (!trimmedQuery) return;

    const currentQuery = this.route.snapshot.queryParamMap.get("q");
    if (currentQuery !== trimmedQuery) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { q: trimmedQuery },
        queryParamsHandling: "merge",
      });
    } else {
      this.tmdbService.searchMovie(trimmedQuery).subscribe((res: any) => {
        this.results = res;
      });
    }
  }

  addToWatchList(movie: any, icon: HTMLElement,event:MouseEvent) {
    event.stopPropagation();
    if (!this.favouritesService.favourites.some((fav) => fav.id === movie.id)) {
      this.favouritesService.favourites.push(movie);
      icon.style.color = "#1abc9c";
    } else {
      const index = this.favouritesService.favourites.findIndex((fav) =>
        fav.id === movie.id
      );
      this.favouritesService.favourites.splice(index, 1);
      icon.style.color = "#34495e";
    }
  }

  handleMovie(id: any) {
    this.router.navigate([`movies/movie/${id}`]);
  }
}
