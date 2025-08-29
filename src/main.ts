// main.ts (browser entry)
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { App } from './app/app';
import { routes } from './app/app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core'; // ✅

bootstrapApplication(App, {
  providers: [
    provideZonelessChangeDetection(), // ✅ no Zone.js required
    provideRouter(routes),
    provideHttpClient(withFetch()),
  ],
}).catch(err => console.error(err));
