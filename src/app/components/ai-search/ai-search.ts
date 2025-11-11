import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { AiService } from '../../services/ai-service';
import { FormsModule } from '@angular/forms';
import {
  catchError,
  filter,
  forkJoin,
  from,
  map,
  mergeMap,
  of,
  Subject,
  switchMap,
  takeUntil,
  tap,
  throwError,
  toArray,
} from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MediaItem } from '../../shared/models/movies';
import { MoviesService } from '../../services/movies-service';
import { Card } from '../../shared/components/card/card';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StructuredDataDirective } from '../../shared/directives/structured-data-directive';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Store } from '@ngrx/store';
import { aiSelector } from '../../store/selectors';
import { storeSearch } from '../../store/actions';

@Component({
  selector: 'app-ai-search',
  imports: [
    CommonModule,
    FormsModule,
    Card,
    RouterLink,
    StructuredDataDirective,
  ],
  templateUrl: './ai-search.html',
  styleUrl: './ai-search.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiSearch {
  unsubscribe = new Subject<void>();
  isLoading = signal<boolean>(false);
  prompt = signal<string>('');
  movies = signal<MediaItem[]>([]);
  errMsg = signal<string>('');
  store = inject(Store);
  moviesSelector = this.store.selectSignal(aiSelector);
  constructor(
    private ai: AiService,
    private movieSer: MoviesService,
    private router: Router,
    private acivatedroute: ActivatedRoute
  ) {
    effect(() => {
      console.log(this.errMsg());
    });
  }
  go(id: number) {
    this.router.navigate(['./movie-details', id], {
      relativeTo: this.acivatedroute,
    });
  }
  ngOnInit(): void {
    if (this.moviesSelector() != null) {
      this.movies.set(this.moviesSelector().movies);
      this.prompt.set(this.moviesSelector().searchInput);
    }
  }
  onSubmit() {
    this.movies.set([]);
    this.isLoading.set(true);
    this.errMsg.set('');
    this.ai
      .aiSearch(this.prompt())
      .pipe(
        map((res: any) => res.exampleMovies),
        switchMap((movies: string[]) =>
          from(movies).pipe(
            mergeMap((movie) =>
              this.movieSer.searchMovies(1, movie).pipe(
                map((res: any) => res.results[0]),
                filter((res) => res != undefined)
              )
            ),
            toArray()
          )
        ),
        takeUntil(this.unsubscribe),
        catchError((error: any) => {
          this.errMsg.set('The model is overloaded. Please try again later');
          this.isLoading.set(false);
          return throwError(() => new Error(error));
        })
      )
      .subscribe({
        next: (res) => {
          const ai = { searchInput: this.prompt(), movies: res };
          this.store.dispatch(storeSearch({ ai: ai }));
          this.movies.set(res);
          this.isLoading.set(false);
        },
        error: (err) => {
          this.isLoading.set(false);
        },
      });
  }
  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
