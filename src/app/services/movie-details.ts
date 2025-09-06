import {
  HttpClient,
  httpResource,
  HttpResourceRef,
  HttpResourceRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Movie } from '../shared/models/movieDetails';
import { MovieVideosResponse } from '../shared/models/movieTrailer';

@Injectable({
  providedIn: 'root',
})
export class MovieDetailsService {
  constructor(private http: HttpClient) {}
  // getMovieDetails(id: number): Observable<Movie> {
  //   return this.http
  //     .get<Movie>(environment.apiUrl + `3/movie/${id}?language=en-US`)
  //     .pipe();
  // }
  getMovieDetails(id: number): HttpResourceRef<Movie | undefined> {
    return httpResource<Movie | undefined>(() => ({
      url: environment.apiUrl + `3/movie/${id}?language=en-US`,
      headers: { Accept: 'application/json' },
    }));
  }

  getMovieTrailers(
    id: number
  ): HttpResourceRef<MovieVideosResponse | undefined> {
    return httpResource<MovieVideosResponse | undefined>(() => ({
      url: environment.apiUrl + `3/movie/${id}/videos?language=en-US`,
      headers: { Accept: 'application/json' },
    }));
  }
}
