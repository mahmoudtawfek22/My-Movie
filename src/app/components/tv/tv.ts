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
import { map, tap } from 'rxjs';
import { MaxNumOfLettersPipe } from '../../shared/pipes/max-num-of-letters-pipe';
import {
  PaginationComponent,
  PaginationConfig,
} from '../../shared/components/pagination/pagination.component';
import { SearchService } from '../../services/search.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PaginationService } from '../../services/pagination-service';
import { StructuredDataDirective } from '../../shared/directives/structured-data-directive';
import { TvItem } from '../../shared/models/tv';
import { tvMetaData } from '../../shared/models/meta';
import { ApiResponse } from '../../shared/models/movies';
import { TvService } from '../../services/tv-service';
import { getBorderColor } from '../../shared/models/borderColor';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Card } from '../../shared/components/card/card';

@Component({
  selector: 'app-tv',
  imports: [
    CommonModule,
    PaginationComponent,
    StructuredDataDirective,
    RouterLink,
    Card,
  ],
  templateUrl: './tv.html',
  styleUrls: ['./tv.scss', '../movies/movies.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tv {
  paginationConfig = signal<PaginationConfig>({
    currentPage: 1,
    itemsPerPage: 20,
    totalItems: 0,
    maxSize: 5,
    totalPages: 0,
  });
  private searchSer = inject(SearchService);
  private destroyRef = inject(DestroyRef);
  getBorderColor = getBorderColor;
  searchText = this.searchSer.searchSignal;
  tv = signal<TvItem[]>([]);
  pageNum: number = 1;
  constructor(
    private paginationService: PaginationService,
    private meta: MetaService,
    private tvService: TvService,
    private acivatedroute: ActivatedRoute,
    private router: Router
  ) {
    this.meta.updateMetaTags(tvMetaData, 'TV');
    effect(() => {
      this.search(this.searchText());
    });
    this.acivatedroute.params.subscribe((param) => {
      this.pageNum = Number(param['id']);
    });
  }

  ngOnInit() {
    // this.getAllChannels(1);
  }

  handleMoviesResponse(page: number) {
    return map((res: ApiResponse<TvItem>) => {
      this.paginationConfig.set(
        this.paginationService.updatePaginationConfig(page, res)
      );
      return res.results;
    });
  }

  getAllChannels(page: number) {
    this.tvService
      .getAllChannels(page)
      .pipe(
        this.handleMoviesResponse(page),
        tap((res: TvItem[]) => {
          this.tv.set(res);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  searchChannels(page: number, search: string) {
    this.tvService
      .searchChannels(page, search)
      .pipe(
        this.handleMoviesResponse(page),

        tap((res: TvItem[]) => {
          this.tv.set(res);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }
  changePage(page: number) {
    if (this.searchText()) {
      this.searchChannels(page, this.searchText());
    } else {
      this.router.navigate(['tv', page]);
      this.getAllChannels(page);
    }
  }

  search(query: string | null) {
    if (query) {
      this.searchChannels(1, query);
    } else {
      this.getAllChannels(this.pageNum);
      this.router.navigate(['tv', this.pageNum]);
    }
  }
}
