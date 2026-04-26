import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

/**
 * Error Interceptor — Centralised HTTP error handling.
 * Maps status codes to readable messages and navigates on 401/403.
 */
export const errorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message = 'Ocurrió un error inesperado. Inténtalo de nuevo.';

      switch (error.status) {
        case 400:
          message = error.error?.message ?? 'Solicitud inválida.';
          break;
        case 401:
          message = 'Sesión expirada. Por favor inicia sesión de nuevo.';
          router.navigate(['/admin/login']);
          break;
        case 403:
          message = 'No tienes permisos para realizar esta acción.';
          router.navigate(['/403']);
          break;
        case 404:
          message = 'Recurso no encontrado.';
          break;
        case 422:
          message = error.error?.message ?? 'Datos de entrada inválidos.';
          break;
        case 500:
          message = 'Error del servidor. Inténtalo más tarde.';
          break;
        case 0:
          message = 'Sin conexión al servidor.';
          break;
      }

      console.error(`[HTTP Error ${error.status}]`, message, error);
      return throwError(() => ({ status: error.status, message }));
    })
  );
};
