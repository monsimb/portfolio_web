#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(__dirname, '..', 'src', 'content', 'blog_posts');
const ASSETS_DIR = path.join(__dirname, '..', 'src', 'assets', 'blog_posts');
const OUT_JSON = path.join(__dirname, '..', 'src', 'assets', 'posts.json');

function slugify(str) {
  return String(str)
    .toLowerCase()
    .replace(/[^a-z0-9\-\s]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function parseFrontmatter(raw) {
  const fm = { data: {}, content: raw };
  const m = raw.match(/^---\s*([\s\S]*?)\s*---\s*([\s\S]*)$/);
  if (!m) return fm;
  const fmText = m[1];
  fm.content = m[2];

  const stripQuotes = (s) => {
    if (typeof s !== 'string') return s;
    s = s.trim();
    if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
      return s.slice(1, -1);
    }
    return s;
  };

  fmText.split('\n').forEach(line => {
    const idx = line.indexOf(':');
    if (idx === -1) return;
    const key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim();
    if (val.startsWith('[') && val.endsWith(']')) {
      try {
        const jsonSafe = val.replace(/(['\"])?([a-zA-Z0-9_\-]+)\1/g, '"$2"');
        val = JSON.parse(jsonSafe).map(stripQuotes);
      } catch (e) {
        val = val.slice(1, -1).split(',').map(s => stripQuotes(s.trim()));
      }
    } else {
      val = stripQuotes(val);
    }
    fm.data[key] = val;
  });
  return fm;
}

if (!fs.existsSync(CONTENT_DIR)) {
  console.error('No content directory found at', CONTENT_DIR);
  process.exit(1);
}

fs.mkdirSync(ASSETS_DIR, { recursive: true });

const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.md'));

const posts = files.map((file) => {
  const full = path.join(CONTENT_DIR, file);
  const raw = fs.readFileSync(full, 'utf-8');
  const { data, content } = parseFrontmatter(raw);

  const filename = path.basename(file, '.md');
  const slug = data.slug ? String(data.slug) : slugify(filename);
  const title = data.title || filename.replace(/[-_]/g, ' ');
  const date = data.date ? new Date(data.date).toISOString() : fs.statSync(full).mtime.toISOString();
  const tags = data.tags || [];
  const excerpt = data.excerpt || content.split('\n\n')[0].replace(/\n/g, ' ').slice(0, 300);

  // copy file to assets
  const dest = path.join(ASSETS_DIR, `${slug}.md`);
  fs.copyFileSync(full, dest);

  return {
    title,
    slug,
    date,
    tags,
    excerpt
  };
});

posts.sort((a, b) => new Date(b.date) - new Date(a.date));

fs.writeFileSync(OUT_JSON, JSON.stringify(posts, null, 2));

// Also write a TypeScript module so posts are available at build/SSR time
const TS_OUT = path.join(__dirname, '..', 'src', 'app', 'generated', 'posts.ts');
fs.mkdirSync(path.dirname(TS_OUT), { recursive: true });
const tsContent = `export const GENERATED_POSTS = ${JSON.stringify(posts, null, 2)} as const;\n`;
fs.writeFileSync(TS_OUT, tsContent);

console.log(`Generated ${posts.length} posts -> ${OUT_JSON} and ${TS_OUT}`);
