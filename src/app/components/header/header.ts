import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  HostListener,
  inject,
  input,
  Renderer2,
  Signal,
  signal,
  ViewChild,
  viewChild,
} from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { SearchComponent } from '../../shared/components/search/search.component';
import { SearchService } from '../../services/search.service';
import { filter } from 'rxjs';
import { log } from 'console';

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
  pageNum = signal<number>(1);
  public searchService = inject(SearchService);
  searchText = this.searchService.searchSignal;
  isMoviesActive = signal<boolean>(false);
  isSeriesActive = signal<boolean>(false);
  isPeopleActive = signal<boolean>(false);
  showSearchIcon = signal<boolean>(true);
  constructor(
    private render: Renderer2,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.isMoviesActive.set(this.router.url.includes('movies'));

        this.isSeriesActive.set(this.router.url.includes('tv'));

        this.isPeopleActive.set(this.router.url.includes('people'));
        let status = this.router.url.split('/').length == 3;
        if (status) {
          this.showSearchIcon.set(true);
        } else {
          this.showSearchIcon.set(false);
        }
      });
  }

  ngOnInit(): void {}
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

  go(url: string, id: number = 0) {
    if (id) {
      this.router.navigate([url, id], {
        relativeTo: this.route,
      });
    } else {
      this.router.navigate([url], {
        relativeTo: this.route,
      });
    }
  }
}
