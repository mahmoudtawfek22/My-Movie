import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
  signal,
} from '@angular/core';
import { MetaService } from '../../services/meta';
import { MoviesService } from '../../services/movies-service';
import { distinctUntilChanged, map, tap } from 'rxjs';
import { ApiResponse, MediaItem } from '../../shared/models/movies';
import { MaxNumOfLettersPipe } from '../../shared/pipes/max-num-of-letters-pipe';
import {
  PaginationComponent,
  PaginationConfig,
} from '../../shared/components/pagination/pagination.component';
import { SearchService } from '../../services/search.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PaginationService } from '../../services/pagination-service';
import { StructuredDataDirective } from '../../shared/directives/structured-data-directive';
import { moviesMetaData } from '../../shared/models/meta';
import { getBorderColor } from '../../shared/models/borderColor';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterModule,
} from '@angular/router';
import { GenreNamePipe } from '../../shared/pipes/genre-name-pipe';

@Component({
  selector: 'app-movies',
  imports: [
    CommonModule,
    MaxNumOfLettersPipe,
    PaginationComponent,
    NgOptimizedImage,
    StructuredDataDirective,
    RouterLink,
    GenreNamePipe,
  ],
  templateUrl: './movies.html',
  styleUrl: './movies.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Movies {
  getBorderColor = getBorderColor;
  paginationConfig: PaginationConfig = {
    currentPage: 1,
    itemsPerPage: 20,
    totalItems: 0,
    maxSize: 5,
    totalPages: 0,
  };
  private searchSer = inject(SearchService);
  private destroyRef = inject(DestroyRef);
  searchText = this.searchSer.searchSignal;
  movies = signal<MediaItem[]>([]);
  pageNum: number = 1;
  constructor(
    private paginationService: PaginationService,
    private meta: MetaService,
    private moviesSer: MoviesService,
    private acivatedroute: ActivatedRoute,
    private router: Router
  ) {
    this.meta.updateMetaTags(moviesMetaData, 'Movies');
    effect(() => {
      this.search(this.searchText());
    });
    this.acivatedroute.params.subscribe((param) => {
      this.pageNum = Number(param['id']);
    });
  }

  ngOnInit() {
    // this.getAllMovies(this.pageNum);
  }

  handleMoviesResponse(page: number) {
    return map((res: ApiResponse<MediaItem>) => {
      this.paginationConfig = this.paginationService.updatePaginationConfig(
        page,
        res
      );
      return res.results;
    });
  }

  getAllMovies(page: number) {
    this.moviesSer
      .getAllMovies(page)
      .pipe(
        this.handleMoviesResponse(page),
        tap((res: MediaItem[]) => {
          this.movies.set(res);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  searchMovies(page: number, search: string) {
    this.moviesSer
      .searchMovies(page, search)
      .pipe(
        distinctUntilChanged(),
        this.handleMoviesResponse(page),

        tap((res: MediaItem[]) => {
          this.movies.set(res);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }
  changePage(page: number) {
    if (this.searchText()) {
      this.searchMovies(page, this.searchText());
    } else {
      this.router.navigate(['movies', page]);
      this.getAllMovies(page);
    }
  }

  search(query: string) {
    if (query) {
      this.searchMovies(1, query);
    } else {
      this.getAllMovies(this.pageNum);
      this.router.navigate(['movies', this.pageNum]);
    }
  }
}
