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
  debug = signal<any>(null);

  ngOnInit() {
    this.blog.getPosts().subscribe({
      next: (p) => { this.posts.set(p); this.debug.set(p); },
      error: (err) => { this.error.set(String(err)); console.error('Failed to load posts', err); }
    });
  }
};
