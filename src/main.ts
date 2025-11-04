import { bootstrapApplication } from '@angular/platform-browser'; import { appConfig } from './app/app.config'; import { App } from './app/app'; import * as Sentry from '@sentry/angular';
Sentry.init({
  dsn: 'https://d5645a0380e4b7b635d7123d3494887d@o88872.ingest.us.sentry.io/4510239840272384',
  integrations: [Sentry.replayIntegration()],
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 1.0,
  tracesSampleRate: 1.0,
});

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
