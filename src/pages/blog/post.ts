import { Component, signal, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from './blog.services';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

@Component({
  standalone: true,
  selector: 'blog-post-page',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './post.html',
  styleUrl: './post.scss'
})
export class BlogPostPage implements OnInit {
  private route = inject(ActivatedRoute);
  private blog = inject(BlogService);
  private sanitizer = inject(DomSanitizer);

  content = signal<string>('');
  html = signal<SafeHtml | string>('');
  title = signal<string>('');
  date = signal<string>('');

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.blog.getPostMd(slug).subscribe(md => {
        this.content.set(md);
        const dirty = marked.parse(md);
        const clean = DOMPurify.sanitize(dirty);
        this.html.set(this.sanitizer.bypassSecurityTrustHtml(clean));
      });

      this.blog.getPosts().subscribe(posts => {
        const p = posts.find(x => x.slug === slug);
        if (p) { this.title.set(p.title); this.date.set(p.date); }
      });
    }
  }
}
