import { Component, effect, signal } from '@angular/core';
import { AiService } from '../../services/ai-service';
import { FormsModule } from '@angular/forms';
import {
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
  toArray,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MediaItem } from '../../shared/models/movies';
import { MoviesService } from '../../services/movies-service';
import { log } from 'console';
import { Card } from '../../shared/components/card/card';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StructuredDataDirective } from '../../shared/directives/structured-data-directive';
import { CommonModule, NgOptimizedImage } from '@angular/common';

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
})
export class AiSearch {
  unsubscribe = new Subject<void>();
  isLoading = signal<boolean>(false);
  prompt = signal<string>('');
  movies = signal<MediaItem[]>([]);
  constructor(
    private ai: AiService,
    private movieSer: MoviesService,
    private router: Router,
    private acivatedroute: ActivatedRoute
  ) {}
  go(id: number) {
    this.router.navigate(['./movie-details', id], {
      relativeTo: this.acivatedroute,
    });
  }
  onSubmit() {
    this.movies.set([]);
    this.isLoading.set(true);

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
        takeUntil(this.unsubscribe)
      )
      .subscribe((res) => {
        this.movies.set(res);
        this.isLoading.set(false);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
