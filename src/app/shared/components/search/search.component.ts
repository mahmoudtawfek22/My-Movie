import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
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
  showSearch = input<boolean>(false);
  searchChange = output<string>();
  private destroyRef = inject(DestroyRef);
  constructor(private fb: FormBuilder, private search: SearchService) {
    this.form = fb.group({
      query: [''],
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
