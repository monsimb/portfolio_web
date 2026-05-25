import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BlogService, PostMeta } from './blog.services';

@Component({
  standalone: true,
  selector: 'blog-page',
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './blog.html',
  styleUrl: './blog.scss'
})
export class BlogPage implements OnInit {
  private blog = inject(BlogService);

  posts = signal<PostMeta[]>([]);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);

  ngOnInit() {
    this.blog.getPosts().subscribe({
      next: posts => {
        const sortedPosts = [...posts].sort((a, b) => {
          const aTime = new Date(a.date).getTime();
          const bTime = new Date(b.date).getTime();

          return bTime - aTime;
        });

        this.posts.set(sortedPosts);
        this.loading.set(false);
      },
      error: err => {
        this.error.set('Failed to load blog posts.');
        this.loading.set(false);
        console.error('Failed to load posts', err);
      }
    });
  }
}
