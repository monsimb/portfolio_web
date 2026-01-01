import { bootstrapApplication, BootstrapContext } from '@angular/platform-browser';
import { App } from './app/app';
import { config } from './app/app.config.server';
import { provideZonelessChangeDetection } from '@angular/core'; // ✅

const bootstrap = (context: BootstrapContext) => bootstrapApplication(App, {
  ...config,
  providers: [
    ...(config?.providers ?? []),
    provideZonelessChangeDetection(), // ✅
  ],
}, context);

export default bootstrap;