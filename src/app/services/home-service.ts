import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiResponse, MediaItem } from '../shared/models/movies';
import { TvItem } from '../shared/models/tv';
import { map, Observable, share, shareReplay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private http = inject(HttpClient);
  topRatedMovies$ = this.http
    .get<ApiResponse<MediaItem>>(
      environment.apiUrl + '3/movie/top_rated?language=en-US&page=1'
    )
    .pipe(
      shareReplay({ bufferSize: 1, refCount: true }),
      map((data) => data.results)
    );

  topRatedSeries$ = this.http
    .get<ApiResponse<TvItem>>(
      environment.apiUrl + '3/tv/top_rated?language=en-US&page=1'
    )
    .pipe(
      shareReplay({ bufferSize: 1, refCount: true }),
      map((data) => data.results)
    );

  popularMovies$ = this.http
    .get<ApiResponse<MediaItem>>(
      environment.apiUrl + '3/movie/popular?language=en-US&page=1'
    )
    .pipe(
      shareReplay({ bufferSize: 1, refCount: true }),
      map((data) => data.results)
    );
  popularSeries$ = this.http
    .get<ApiResponse<TvItem>>(
      environment.apiUrl + '3/tv/popular?language=en-US&page=1'
    )
    .pipe(
      shareReplay({ bufferSize: 1, refCount: true }),
      map((data) => data.results)
    );
  constructor() {}

  getTopRatedMovies(): Observable<MediaItem[]> {
    return this.topRatedMovies$;
  }
  getTopRatedSeries(): Observable<TvItem[]> {
    return this.topRatedSeries$;
  }
  getPopularMovies(): Observable<MediaItem[]> {
    return this.popularMovies$;
  }
  getPopularSeries(): Observable<TvItem[]> {
    return this.popularSeries$;
  }
}
