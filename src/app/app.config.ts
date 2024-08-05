import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { NgxsModule, provideStore } from '@ngxs/store';
import { AppState } from './state/app.state';
import { withNgxsReduxDevtoolsPlugin } from '@ngxs/devtools-plugin';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideStore([], withNgxsReduxDevtoolsPlugin()),
    importProvidersFrom( NgxsModule.forRoot([AppState]), BrowserAnimationsModule)
  ],
};
