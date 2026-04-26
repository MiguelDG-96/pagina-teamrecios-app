import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

let activeRequests = 0;

/**
 * Loading Interceptor — Tracks in-flight HTTP requests.
 * Emits a custom DOM event so any component can react to loading state.
 */
export const loadingInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  activeRequests++;
  dispatchLoadingEvent(true);

  return next(req).pipe(
    finalize(() => {
      activeRequests--;
      if (activeRequests === 0) {
        dispatchLoadingEvent(false);
      }
    })
  );
};

function dispatchLoadingEvent(loading: boolean): void {
  const event = new CustomEvent('app:loading', { detail: { loading } });
  window.dispatchEvent(event);
}
