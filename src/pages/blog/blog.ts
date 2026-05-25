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
  error = signal<string | null>(null);

  ngOnInit() {
    this.blog.getPosts().subscribe({
      next: (posts) => {
        const sortedPosts = [...posts].sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });

        this.posts.set(sortedPosts);
      },
      error: (err) => {
        this.error.set(String(err));
        console.error('Failed to load posts', err);
      }
    });
  }
}
