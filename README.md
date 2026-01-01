# PortfolioWebsite

This project was created using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.6.

## Blog (Markdown-in-repo)

- Add markdown files to `src/content/blog_posts/` with YAML frontmatter (`title`, `date`, `tags`, `slug`, `excerpt` optional).
- Generate assets and index with:

```bash
npm install
npm run build:blog-assets
```

- During development you can run `npm start` (a `prestart` script runs the generator if present).
- Posts are served from `src/assets/blog_posts/` and an index at `src/assets/posts.json`.

Example frontmatter:

```yaml
---
title: "My First Post"
date: 2025-12-31
tags: [personal, tech]
slug: my-first-post
excerpt: "Short excerpt goes here."
---

Content...
```
