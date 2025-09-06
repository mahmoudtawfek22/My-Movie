import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, shareReplay } from 'rxjs';
import { ApiResponse } from '../shared/models/movies';
import { Person } from '../shared/models/people';
@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  constructor(private http: HttpClient) {}
  getAllPeople(page: number): Observable<ApiResponse<Person>> {
    let params = new HttpParams().append('page', page);
    return this.http.get<ApiResponse<Person>>(
      environment.apiUrl + '3/trending/person/day?language=en-US',
      { params }
    );
  }

  searchPeople(page: number, query: string): Observable<ApiResponse<Person>> {
    let params = new HttpParams().append('page', page);
    if (query) params = params.append('query', query);
    return this.http.get<ApiResponse<Person>>(
      environment.apiUrl +
        '3/search/person?include_adult=false&language=en-US&page=1',
      { params }
    );
  }
}
