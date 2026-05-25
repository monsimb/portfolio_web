import { Component, signal, inject, OnInit, ViewEncapsulation } from '@angular/core';
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
  styleUrl: './post.scss',
  encapsulation: ViewEncapsulation.None
})
export class BlogPostPage implements OnInit {
  private route = inject(ActivatedRoute);
  private blog = inject(BlogService);
  private sanitizer = inject(DomSanitizer);

  content = signal<string>('');
  html = signal<SafeHtml | string>('');
  title = signal<string>('');
  date = signal<string>('');
  tags = signal<string[]>([]);

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');

    if (!slug) {
      this.title.set('Post not found');
      return;
    }

    this.blog.getPostMd(slug).subscribe(md => {
      const body = this.stripFrontMatter(md);

      this.content.set(body);

      const dirty = marked.parse(body) as string;
      const clean = DOMPurify.sanitize(dirty);

      this.html.set(this.sanitizer.bypassSecurityTrustHtml(clean));
    });

    this.blog.getPosts().subscribe(posts => {
      const p = posts.find(x => x.slug === slug);

      if (p) {
        this.title.set(p.title);
        this.date.set(p.date);
        this.tags.set(p.tags ?? []);
      }
    });
  }

  private stripFrontMatter(md: string): string {
    return md.replace(/^---[\s\S]*?---\s*/, '');
  }
}
