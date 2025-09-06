import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { Video } from '../../models/video';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpResourceRef } from '@angular/common/http';
import { MovieVideo, MovieVideosResponse } from '../../models/movieTrailer';
import { MovieDetailsService } from '../../../services/movie-details';

@Component({
  selector: 'app-trailer',
  imports: [CommonModule],
  templateUrl: './trailer.html',
  styleUrl: './trailer.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Trailer {
  videos = input<MovieVideo[]>([]);
  selected = signal<string>('');
  safeUrl?: SafeResourceUrl;
  constructor(private domSanitizer: DomSanitizer) {
    effect(() => {
      if (this.videos()) {
        this.changeTrailer(this.videos()[0].key);
      }
    });
  }

  changeTrailer(key: string) {
    this.selected.set(key);
    const url = `https://www.youtube-nocookie.com/embed/${key}?rel=0&modestbranding=1 `;
    this.safeUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
