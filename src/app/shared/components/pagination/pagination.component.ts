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

  constructor() {}

  // @Input() config!: PaginationConfig;

  // @Output() pageChange = new EventEmitter<number>();
  pageChange = output<number>();

  get pages(): number[] {
    const pages: number[] = [];
    const maxSize = this.config().maxSize;
    const currentPage = this.config().currentPage;
    const totalPages = this.config().totalPages;

    if (totalPages <= maxSize) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - Math.floor(maxSize / 2));
      let endPage = startPage + maxSize - 1;

      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - maxSize + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  }

  goToPage(page: number): void {
    if (
      page >= 1 &&
      page <= this.config().totalPages &&
      page !== this.config().currentPage
    ) {
      this.pageChange.emit(page);
    }
  }

  goToFirst(): void {
    this.goToPage(1);
  }

  goToLast(): void {
    this.goToPage(this.config().totalPages);
  }

  goToPrevious(): void {
    this.goToPage(this.config().currentPage - 1);
  }

  goToNext(): void {
    this.goToPage(this.config().currentPage + 1);
  }

  isFirstPage(): boolean {
    return this.config().currentPage === 1;
  }

  isLastPage(): boolean {
    return this.config().currentPage === this.config().totalPages;
  }
}
