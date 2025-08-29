import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { config } from './app/app.config.server';
import { provideZonelessChangeDetection } from '@angular/core'; // ✅

const bootstrap = () => bootstrapApplication(App, {
  ...config,
  providers: [
    ...(config?.providers ?? []),
    provideZonelessChangeDetection(), // ✅
  ],
});

export default bootstrap;