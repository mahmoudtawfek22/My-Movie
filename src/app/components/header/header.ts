import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  Renderer2,
  ViewChild,
  viewChild,
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SearchComponent } from '../../shared/components/search/search.component';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, SearchComponent],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  isMenuOpen: boolean = false;
  @ViewChild('ul') ul!: ElementRef;
  @ViewChild('burger') burger!: ElementRef;
  showSearch: boolean = false;
  pageNum: number = 1;
  public searchService = inject(SearchService);
  searchText = this.searchService.searchSignal;
  constructor(private render: Renderer2, private router: Router) {}
  ngAfterViewInit(): void {
    // this.appearUl();
  }

  appearUl() {
    if (this.isMenuOpen == false) {
      this.isMenuOpen = true;
    } else if (this.isMenuOpen == true) {
      this.isMenuOpen = false;
    }
  }
  displaySearch() {
    this.showSearch = !this.showSearch;
  }

  @HostListener('document:click', ['$event']) closeMenu(ev: Event) {
    if (
      this.isMenuOpen &&
      ev.target instanceof Node &&
      !this.ul.nativeElement.contains(ev.target) &&
      !this.burger.nativeElement.contains(ev.target)
    ) {
      this.isMenuOpen = false;
    }
  }
}
