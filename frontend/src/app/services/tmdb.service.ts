import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private apiKey = '66e768633534503008b0d7c9317a0a1f';
  private baseUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=66e768633534503008b0d7c9317a0a1f&with_genres=28';

  constructor(private http: HttpClient) {}

  // getNowPlaying() {
  //   return this.http.get(`${this.baseUrl}/movie/now_playing?api_key=${this.apiKey}&language=en-US`);
  // }

  getNowPlaying(page:number) {
  return this.http.get(`http://localhost:3000/api/movies?page=${page}&limit=5`);
  }

  searchMovie(query: string) {
    return this.http.get(`http://localhost:3000/api/movies/search?q=${query}`);
  }

  getMovie(id:any){
    return this.http.get(`http://localhost:3000/api/movies/${id}`)
  }
}
