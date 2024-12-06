import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RequestCustom } from '../types/http';
import { JWT_SECRET } from '../constants/jwt';
import { ModelSchema } from '../constants/model';
import { SysMessageService } from 'src/sys-message/sys-message.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private sysMessage: SysMessageService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException(
        this.sysMessage.getErrorMessage(ModelSchema.User.entity, 'not_auth'),
      );
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: JWT_SECRET,
      });
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException(
        this.sysMessage.getErrorMessage(ModelSchema.User.entity, 'not_auth'),
      );
    }

    return true;
  }

  private extractTokenFromHeader(request: RequestCustom): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
