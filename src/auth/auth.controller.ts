import { Body, Controller, Post, Res, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ResponseCustom, ResponseData } from 'src/common/types/http';
import { RegisterDto } from './dto/register.dto';
import { SysMessageService } from 'src/sys-message/sys-message.service';

@Controller('/api/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private sysMessage: SysMessageService,
  ) {}

  @Post('/login')
  async login(
    @Body(new ValidationPipe()) payload: LoginDto,
    @Res() res: ResponseCustom,
  ) {
    const data = await this.authService.login(payload);

    const response: ResponseData = {
      success: true,
      data,
      message: this.sysMessage.getSuccessMessage('', 'login'),
      statusCode: 201,
    };

    return res.status(201).send(response);
  }

  @Post('/register')
  async register(
    @Body(new ValidationPipe()) payload: RegisterDto,
    @Res() res: ResponseCustom,
  ) {
    const data = await this.authService.register(payload);

    const response: ResponseData = {
      success: true,
      data,
      message: this.sysMessage.getSuccessMessage('', 'register'),
      statusCode: 201,
    };

    return res.status(201).send(response);
  }
}
