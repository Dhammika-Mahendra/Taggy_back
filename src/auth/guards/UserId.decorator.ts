import { createParamDecorator, ExecutionContext, Logger } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const getCurrentUserIdByContext = (context: ExecutionContext): string => {
    if (context.getType() === 'http') {
        const val= context.switchToHttp().getRequest()['userID'];
        Logger.log(val);
        return val;
    }
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.UserID;
};

export const UserIDdeco = createParamDecorator(
    (_data: unknown, context: ExecutionContext) =>
        getCurrentUserIdByContext(context),
);