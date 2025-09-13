import { Card } from '../../shared/components/card/card';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { CommonModule } from '@angular/common';
import {
  afterEveryRender,
  afterNextRender,
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  Signal,
  signal,
} from '@angular/core';
import { MetaService } from '../../services/meta';
import { MoviesService } from '../../services/movies-service';
import { distinctUntilChanged, map, tap } from 'rxjs';
import { ApiResponse, MediaItem } from '../../shared/models/movies';
import { MaxNumOfLettersPipe } from '../../shared/pipes/max-num-of-letters-pipe';
import {} from '../../shared/components/pagination/pagination.component';
import { SearchService } from '../../services/search.service';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { PaginationService } from '../../services/pagination-service';
import { StructuredDataDirective } from '../../shared/directives/structured-data-directive';
import { moviesMetaData } from '../../shared/models/meta';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { httpResource } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { TvItem } from '../../shared/models/tv';
import { HomeService } from '../../services/home-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    StructuredDataDirective,
    Card,
    CarouselModule,
    FormsModule,
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.scss', '../movies/movies.scss'],
})
export class Home {
  pageNum = signal<number>(1);
  private homeService = inject(HomeService);

  topRatedMovies = toSignal(this.homeService.getTopRatedMovies(), {
    initialValue: [],
  });
  topRatedSeries = toSignal(this.homeService.getTopRatedSeries(), {
    initialValue: [],
  });

  popularMovies = toSignal(this.homeService.getPopularMovies(), {
    initialValue: [],
  });
  popularSeries = toSignal(this.homeService.getPopularSeries(), {
    initialValue: [],
  });
  isLoading = computed(
    () =>
      this.topRatedMovies().length > 0 &&
      this.topRatedSeries().length > 0 &&
      this.popularMovies().length > 0 &&
      this.popularSeries().length > 0 &&
      this.showCarousel()
  );
  clickable = signal<boolean>(false);
  showCarousel = signal<boolean>(false);
  customOptions: OwlOptions = {
    loop: true,
    autoHeight: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplaySpeed: 1000,
    autoplayMouseleaveTimeout: 3000,
    autoplayHoverPause: true,
    dots: true,
    dotsEach: 4,
    navSpeed: 700, // نخلي السرعة أسرع شوية
    navText: ['', ''],
    animateOut: 'enter-animation', // تأثير خروج السلايد
    animateIn: 'enter-animation', // تأثير دخول السلايد
    responsive: {
      0: {
        items: 2,
      },
      400: {
        items: 3,
      },
      740: {
        items: 4,
      },
      940: {
        items: 5,
      },
      1200: {
        items: 6,
      },
    },
  };

  constructor(
    private meta: MetaService,
    private acivatedroute: ActivatedRoute,
    public router: Router
  ) {
    this.meta.updateMetaTags(moviesMetaData, 'Movies');
    afterRenderEffect(() => {
      this.showCarousel.set(true);
    });
  }

  ngOnInit() {}

  go(route: string, id: number) {
    if (this.clickable()) {
      this.router.navigate([route, id], {
        relativeTo: this.acivatedroute,
      });
    }
  }
  onDrag(bool: boolean) {
    this.clickable.set(bool); //false
  }
  onDragEnd(bool: boolean) {
    setTimeout(() => {
      this.clickable.set(bool);
    }, 300);
  }
}
