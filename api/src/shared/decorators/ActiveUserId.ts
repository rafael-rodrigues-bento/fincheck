import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common'

export const ActiveUserId = createParamDecorator<undefined>(
  (_, context: ExecutionContext) => {
    const { userId } = context.switchToHttp().getRequest()
    if (!userId) {
      throw new UnauthorizedException()
    }
    return userId
  },
)
