import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MaxNumOfLettersPipe } from '../../pipes/max-num-of-letters-pipe';
import { GenreNamePipe } from '../../pipes/genre-name-pipe';
import { getBorderColor } from '../../models/borderColor';

@Component({
  selector: 'app-card',
  imports: [NgOptimizedImage, MaxNumOfLettersPipe, GenreNamePipe],
  templateUrl: './card.html',
  styleUrl: './card.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Card {
  getBorderColor = getBorderColor;

  data$ = input<any>({});
  index = input<number>(0);
  constructor() {}
}
