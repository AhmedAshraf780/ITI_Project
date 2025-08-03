import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TmdbService } from '../../services/tmdb.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  query: string = '';
  results: any[] = [];

  constructor(
    private tmdbService: TmdbService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.query = params['q'] || '';
      if (this.query.trim()) {
        this.tmdbService.searchMovie(this.query.trim()).subscribe((res: any) => {
          this.results = res.results;
        });
      }
    });
  }

  searchMovie() {
    const trimmedQuery = this.query.trim();
    if (!trimmedQuery) return;

    const currentQuery = this.route.snapshot.queryParamMap.get('q');
    if (currentQuery !== trimmedQuery) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { q: trimmedQuery },
        queryParamsHandling: 'merge'
      });
    } else {
      this.tmdbService.searchMovie(trimmedQuery).subscribe((res: any) => {
        this.results = res.results;
      });
    }
  }
}
