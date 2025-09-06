import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  signal,
  Signal,
} from '@angular/core';
import { getBorderColor } from '../../shared/models/borderColor';
import { MovieDetailsService } from '../../services/movie-details';
import { ActivatedRoute } from '@angular/router';
import { Trailer } from '../../shared/components/trailer/trailer';
import { HttpResourceRef } from '@angular/common/http';
import { Movie } from '../../shared/models/movieDetails';
import {
  MovieVideo,
  MovieVideosResponse,
} from '../../shared/models/movieTrailer';
import { Video } from '../../shared/models/video';

@Component({
  selector: 'app-movie-details',
  imports: [CommonModule, NgOptimizedImage, Trailer],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class MovieDetails {
  getBorderColor = getBorderColor;
  movie!: HttpResourceRef<Movie | undefined>;
  trailer!: HttpResourceRef<MovieVideosResponse | undefined>;

  videos = signal<MovieVideo[]>([]);
  id: number = 1;
  constructor(
    private movieService: MovieDetailsService,
    private activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.movie = this.movieService.getMovieDetails(this.id);
      this.trailer = this.movieService.getMovieTrailers(this.id);
    });

    effect(() => {
      const trailer = this.trailer?.value()?.results;
      if (trailer && trailer.length > 0) {
        this.videos.set(trailer.slice(0, 10));
      }
    });
  }
}
