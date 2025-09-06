import { TestBed } from '@angular/core/testing';

import { MovieDetailsService } from './movie-details';

describe('MovieDetails', () => {
  let service: MovieDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
