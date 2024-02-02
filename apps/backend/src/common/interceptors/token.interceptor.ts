import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

// reference https://docs.nestjs.com/interceptors#basics
// Intercept incoming request and modify it before reaching the route handler
@Injectable()
export class TokenInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const gqlContext = GqlExecutionContext.create(context);
    const ctx = gqlContext.getContext();

    const authorizationHeader = ctx.req.headers.authorization;

    if (authorizationHeader) {
      const token = authorizationHeader.split(' ')[1];
      ctx.token = token;
    }

    return next.handle();
  }
}
