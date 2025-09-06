import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  searchSignal = signal<string>('');

  constructor() {}
  setSearch(text: string) {
    this.searchSignal.set(text);
  }
}
