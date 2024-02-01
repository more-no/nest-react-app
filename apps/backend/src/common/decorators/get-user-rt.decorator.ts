import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GetUserRt = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const refreshToken =
      GqlExecutionContext.create(context).getArgs().refreshToken;
    return refreshToken;
  },
);
