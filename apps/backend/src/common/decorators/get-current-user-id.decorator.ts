import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { JwtPayload } from 'src/graphql';

export const GetCurrentUserId = createParamDecorator(
  (_: string | undefined, context: ExecutionContext): number => {
    const request = context.switchToHttp().getRequest();
    const user = request.user as JwtPayload;
    return user.sub;
  },
);
