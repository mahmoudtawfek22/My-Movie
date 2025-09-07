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
import { ApiResponse } from '../../shared/models/movies';
import { MaxNumOfLettersPipe } from '../../shared/pipes/max-num-of-letters-pipe';
import {
  PaginationComponent,
  PaginationConfig,
} from '../../shared/components/pagination/pagination.component';
import { SearchService } from '../../services/search.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PaginationService } from '../../services/pagination-service';
import { StructuredDataDirective } from '../../shared/directives/structured-data-directive';
import { getBorderColor } from '../../shared/models/borderColor';
import { Person } from '../../shared/models/people';
import { peopleMetaData } from '../../shared/models/meta';
import { PeopleService } from '../../services/people-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-people',
  templateUrl: './people.html',
  styleUrls: [
    '../movies/movies.scss',
    './people.scss',
    '../../shared/components/card/card.scss',
  ],

  imports: [
    CommonModule,
    PaginationComponent,
    NgOptimizedImage,
    StructuredDataDirective,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class People {
  getBorderColor = getBorderColor;
  paginationConfig = signal<PaginationConfig>({
    currentPage: 1,
    itemsPerPage: 20,
    totalItems: 0,
    maxSize: 5,
    totalPages: 0,
  });
  private searchSer = inject(SearchService);
  private destroyRef = inject(DestroyRef);
  searchText = this.searchSer.searchSignal;
  people = signal<Person[]>([]);
  pageNum: number = 1;

  constructor(
    private paginationService: PaginationService,
    private meta: MetaService,
    private peopleService: PeopleService,
    private acivatedroute: ActivatedRoute,
    private router: Router
  ) {
    this.meta.updateMetaTags(peopleMetaData, 'People');
    effect(() => {
      this.search(this.searchText());
    });
    this.acivatedroute.params.subscribe((param) => {
      this.pageNum = Number(param['id']);
    });
  }

  ngOnInit() {
    // this.getAllPeople(1);
  }

  handleMoviesResponse(page: number) {
    return map((res: ApiResponse<Person>) => {
      this.paginationConfig.set(
        this.paginationService.updatePaginationConfig(page, res)
      );
      return res.results;
    });
  }

  getAllPeople(page: number) {
    this.peopleService
      .getAllPeople(page)
      .pipe(
        this.handleMoviesResponse(page),
        tap((res: Person[]) => {
          this.people.set(res);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  searchPeople(page: number, search: string) {
    this.peopleService
      .searchPeople(page, search)
      .pipe(
        this.handleMoviesResponse(page),

        tap((res: Person[]) => {
          this.people.set(res);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }
  changePage(page: number) {
    if (this.searchText()) {
      this.searchPeople(page, this.searchText());
    } else {
      this.router.navigate(['people', page]);
      this.getAllPeople(page);
    }
  }

  search(query: string | null) {
    if (query) {
      this.searchPeople(1, query);
    } else {
      this.getAllPeople(1);
      this.router.navigate(['people', this.pageNum]);
    }
  }
}
