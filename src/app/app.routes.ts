import { Routes } from '@angular/router';
import { ProjectsPage } from '../pages/projects/projects';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { BlogPage } from '../pages/blog/blog';
import { BlogPostPage } from '../pages/blog/post';

export const routes: Routes = [
  { path: '', component: AboutPage, title: 'About Me' },
  { path: 'projects', component: ProjectsPage, title: 'Projects & Awards' },
  { path: 'about', component: AboutPage, title: 'About Me' },
  { path: 'contact', component: ContactPage, title: 'Contact' },
  { path: 'blog', component: BlogPage, title: 'Blog' },
  { path: 'blog/:slug', component: BlogPostPage, title: 'Blog Post' },
  { path: '**', redirectTo: '' }
];
