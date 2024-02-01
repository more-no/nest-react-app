import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';

// reference https://docs.nestjs.com/interceptors#basics
// Intercept incoming request and modify it before reaching the route handler
@Injectable()
export class TokenInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // modify the request object
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization.split(' ')[1]; // remove "Bearer " from the string
    request.token = token;
    return next.handle();
  }
}
