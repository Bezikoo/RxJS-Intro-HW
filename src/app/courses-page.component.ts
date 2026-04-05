import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  startWith,
  switchMap,
} from 'rxjs';

import { Course } from './course.model';
import { CoursesService } from './courses.service';

@Component({
  selector: 'app-courses-page',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './courses-page.component.html',
  styleUrl: './courses-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesPageComponent {
  readonly searchControl = new FormControl('', { nonNullable: true });

  readonly courses$: Observable<Course[]> = this.searchControl.valueChanges.pipe(
    startWith(''),
    debounceTime(300),
    distinctUntilChanged(),
    switchMap((query) => this.coursesService.searchCourses(query))
  );

  constructor(private readonly coursesService: CoursesService) {}
}