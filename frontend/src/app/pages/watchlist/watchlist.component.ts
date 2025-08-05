import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterModule } from "@angular/router";
import { FavouritesService } from "../../services/favourites.service";

@Component({
  selector: "app-watchlist",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./watchlist.component.html",
  styleUrls: ["./watchlist.component.css"],
})
export class WatchlistComponent {
  constructor(public favouritesService: FavouritesService,private router:Router) {}
  handleMovie(id: any) {
    this.router.navigate([`movies/movie/${id}`])
  }
  removeWatchList(movie: any, icon: HTMLElement) {
      this.favouritesService.favourites = this.favouritesService.favourites.filter(f => f.id !== movie.id);
    (this.favouritesService as any).saveToStorage();
  }
}
