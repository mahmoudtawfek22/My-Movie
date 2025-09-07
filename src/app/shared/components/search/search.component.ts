import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  effect,
  inject,
  input,
  Input,
  OnInit,
  output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs';
import { SearchService } from '../../../services/search.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class SearchComponent implements OnInit {
  form: FormGroup;
  private search = inject(SearchService);
  showSearch = input<boolean>(false);
  searchChange = output<string>();
  searchtext = this.search.searchSignal;
  private destroyRef = inject(DestroyRef);
  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      query: [this.searchtext()],
    });
    effect(() => {
      if (this.searchtext() == '') {
        this.form.controls['query'].setValue(this.searchtext());
      }
    });
  }

  ngOnInit() {
    this.form.controls['query'].valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),

        tap((value) => {
          this.searchChange.emit(value);
          this.search.setSearch(value);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }
}
