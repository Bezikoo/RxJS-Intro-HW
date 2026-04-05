import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Course } from './course.model';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private readonly courses: Course[] = [
    { id: 1, title: 'Angular Basics', category: 'Frontend', duration: '6h' },
    { id: 2, title: 'Advanced RxJS', category: 'Frontend', duration: '8h' },
    { id: 3, title: 'TypeScript from Zero', category: 'Programming', duration: '5h' },
    { id: 4, title: 'Node.js Essentials', category: 'Backend', duration: '7h' },
    { id: 5, title: 'Testing in Angular', category: 'QA', duration: '4h' },
    { id: 6, title: 'Reactive Forms Deep Dive', category: 'Frontend', duration: '5h' },
  ];

  getCourses(): Observable<Course[]> {
    return of(this.courses);
  }

  searchCourses(query: string): Observable<Course[]> {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return this.getCourses();
    }

    return of(
      this.courses.filter((course) =>
        course.title.toLowerCase().includes(normalizedQuery)
      )
    );
  }
}