import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavouritesService } from '../../services/favourites.service';

@Component({
  selector: 'app-watchlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent {
  constructor(public favouritesService: FavouritesService) {}
}
