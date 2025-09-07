import { AsyncPipe, CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  input,
  output,
  effect,
  ChangeDetectorRef,
  computed,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface PaginationConfig {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  maxSize: number;
  totalPages: number;
}
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class PaginationComponent {
  config = input<PaginationConfig>({
    currentPage: 0,
    itemsPerPage: 20,
    totalItems: 0,
    maxSize: 5,
    totalPages: 0,
  });
  currentPage = computed(() => this.config().currentPage);
  totalPages = computed(() => this.config().totalPages);
  paginatorPages = signal<number[]>([]);
  constructor() {
    effect(() => {
      this.currentPage();
      this.pages;
    });
  }

  pageChange = output<number>();

  get pages(): number[] {
    const pages: number[] = [];
    const maxSize = this.config().maxSize;

    if (this.totalPages() <= maxSize) {
      for (let i = 1; i <= this.totalPages(); i++) {
        pages.push(i);
      }
    } else {
      let startPage = Math.max(1, this.currentPage() - Math.floor(maxSize / 2));
      let endPage = startPage + maxSize - 1;

      if (endPage > this.totalPages()) {
        endPage = this.totalPages();
        startPage = Math.max(1, endPage - maxSize + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
    this.paginatorPages.set(pages);
    return pages;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages() && page !== this.currentPage()) {
      this.pageChange.emit(page);
    }
  }

  goToFirst(): void {
    this.goToPage(1);
  }

  goToLast(): void {
    this.goToPage(this.totalPages());
  }

  goToPrevious(): void {
    this.goToPage(this.currentPage() - 1);
  }

  goToNext(): void {
    this.goToPage(this.currentPage() + 1);
  }

  isFirstPage(): boolean {
    return this.currentPage() === 1;
  }

  isLastPage(): boolean {
    return this.currentPage() === this.totalPages();
  }
}
