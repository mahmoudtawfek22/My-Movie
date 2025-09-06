/* tslint:disable:no-unused-variable */

import { SearchService } from './search.service';

import { TestBed } from '@angular/core/testing';

describe('SearchService', () => {
  let service: SearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
