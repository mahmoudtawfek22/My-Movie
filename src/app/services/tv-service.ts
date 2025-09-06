import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TvItem } from '../shared/models/tv';
import { ApiResponse } from '../shared/models/movies';
import { environment } from '../../environments/environment';
import { TvDetails } from '../shared/models/seriesDetails';
import { MovieVideo, MovieVideosResponse } from '../shared/models/movieTrailer';

@Injectable({
  providedIn: 'root',
})
export class TvService {
  constructor(private http: HttpClient) {}
  getAllChannels(page: number): Observable<ApiResponse<TvItem>> {
    let params = new HttpParams().append('page', page);
    return this.http.get<ApiResponse<TvItem>>(
      environment.apiUrl + '3/trending/tv/day?language=en-US',
      { params }
    );
  }

  searchChannels(page: number, query: string): Observable<ApiResponse<TvItem>> {
    let params = new HttpParams().append('page', page);
    if (query) params = params.append('query', query);
    return this.http.get<ApiResponse<TvItem>>(
      environment.apiUrl +
        '3/search/tv?include_adult=false&language=en-US&page=1',
      { params }
    );
  }

  getSeriesDetails(id: number): Observable<TvDetails> {
    return this.http.get<TvDetails>(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US`
    );
  }
  getSeriesVideos(id: number): Observable<MovieVideosResponse> {
    return this.http.get<MovieVideosResponse>(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`
    );
  }
}
