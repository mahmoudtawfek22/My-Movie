import { Injectable } from '@angular/core';
import { ApiResponse } from '../shared/models/movies';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  updatePaginationConfig(page: number, res: ApiResponse<any>) {
    let paginationConfig = {
      currentPage: page,
      itemsPerPage: 20,
      totalItems: res.total_results,
      maxSize: 5,
      totalPages: res.total_pages,
    };

    return paginationConfig;
  }
}
