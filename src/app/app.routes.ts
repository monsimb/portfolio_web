import { Routes } from '@angular/router';
import { ProjectsPage } from '../pages/projects/projects';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';

export const routes: Routes = [
  { path: '', component: ProjectsPage, title: 'About Me' },
  { path: 'projects', component: ProjectsPage, title: 'Projects & Awards' },
  { path: 'about', component: AboutPage, title: 'About Me' },
  { path: 'contact', component: ContactPage, title: 'Contact' },
  { path: '**', redirectTo: '' }
];
