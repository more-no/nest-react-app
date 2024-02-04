import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RtGuard extends AuthGuard('jwt-refresh') {
  getRequest(context: ExecutionContext) {
    const refreshToken = GqlExecutionContext.create(context).getContext().req;
    return refreshToken;
  }
}
