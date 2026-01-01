import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, switchMap } from 'rxjs';
import { GENERATED_POSTS } from '../../app/generated/posts';

export interface PostMeta {
  title: string;
  slug: string;
  date: string;
  tags?: string[];
  excerpt?: string;
}

@Injectable({ providedIn: 'root' })
export class BlogService {
  private http = inject(HttpClient);
  // Use relative paths (no leading slash) to respect base-href and environments
  private postsJson = 'assets/posts.json';
  private postsDir = 'assets/blog_posts';

  // Try http, but fall back to the generated module (works during SSR/build)
  getPosts(): Observable<PostMeta[]> {
    return this.http.get<PostMeta[]>(this.postsJson).pipe(
      catchError(() => of([] as PostMeta[])),
      switchMap((arr) => Array.isArray(arr) && arr.length ? of(arr as PostMeta[]) : of(GENERATED_POSTS as unknown as PostMeta[]))
    );
  }

  getPostMd(slug: string): Observable<string> {
    return this.http.get(`${this.postsDir}/${slug}.md`, { responseType: 'text' }).pipe(
      catchError(() => of(''))
    );
  }
}
