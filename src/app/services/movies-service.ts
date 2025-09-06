import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { distinctUntilChanged, Observable, shareReplay } from 'rxjs';
import { ApiResponse, MediaItem } from '../shared/models/movies';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private http: HttpClient) {}

  getAllMovies(page: number): Observable<ApiResponse<MediaItem>> {
    let params = new HttpParams().append('page', page);
    return this.http
      .get<ApiResponse<MediaItem>>(
        environment.apiUrl + '3/trending/movie/day?language=en-US',
        { params }
      )
      .pipe(distinctUntilChanged());
  }

  searchMovies(
    page: number,
    query: string
  ): Observable<ApiResponse<MediaItem>> {
    let params = new HttpParams().append('page', page);
    if (query) params = params.append('query', query);
    return this.http.get<ApiResponse<MediaItem>>(
      environment.apiUrl + '3/search/movie?include_adult=false&language=en-US',
      { params }
    );
  }
}
