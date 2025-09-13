import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  signal,
  Signal,
} from '@angular/core';
import { getBorderColor } from '../../shared/models/borderColor';
import { ActivatedRoute } from '@angular/router';
import { Trailer } from '../../shared/components/trailer/trailer';
import { HttpResourceRef } from '@angular/common/http';
import { Movie } from '../../shared/models/movieDetails';
import {
  MovieVideo,
  MovieVideosResponse,
} from '../../shared/models/movieTrailer';
import { TvService } from '../../services/tv-service';
import { TvDetails } from '../../shared/models/seriesDetails';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { map, Observable, tap } from 'rxjs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MaxNumOfLettersPipe } from '../../shared/pipes/max-num-of-letters-pipe';

@Component({
  selector: 'app-series-details',
  imports: [
    CommonModule,
    NgOptimizedImage,
    Trailer,
    MatExpansionModule,
    MaxNumOfLettersPipe,
  ],
  templateUrl: './series-details.html',
  styleUrls: [
    './series-details.scss',
    '../movie-details/movie-details.scss',
    '../../shared/components/card/card.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class SeriesDetails {
  getBorderColor = getBorderColor;
  series = signal<TvDetails | null>(null);
  viewMode = signal<'grid' | 'accordion'>('grid');
  videos = signal<MovieVideo[]>([]);
  id: number = 1;
  constructor(
    private tvService: TvService,
    private activatedRoute: ActivatedRoute,
    private destroyer: DestroyRef
  ) {
    activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.getSeriesDetails(this.id);
      this.getSeriesVideos(this.id);
    });
  }
  ngOnInit(): void {}
  getSeriesDetails(id: number) {
    this.tvService
      .getSeriesDetails(id)
      .pipe(
        tap((res) => {
          this.series.set(res);
        }),
        takeUntilDestroyed(this.destroyer)
      )
      .subscribe();
  }

  getSeriesVideos(id: number) {
    this.tvService
      .getSeriesVideos(id)
      .pipe(
        map((res) => res.results),
        tap((res) => {
          this.videos.set(res.slice(0, 10));
        }),
        takeUntilDestroyed(this.destroyer)
      )
      .subscribe();
  }

  toggleView() {
    this.viewMode.set(this.viewMode() === 'grid' ? 'accordion' : 'grid');
  }
}
