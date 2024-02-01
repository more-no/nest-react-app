import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GetUserId = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const userId = GqlExecutionContext.create(context).getArgs().userId;
    return userId;
  },
);
