import { BadRequestException, Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { ModelSchema } from 'src/common/constants/model';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './auth.type';
import { SysMessageService } from 'src/sys-message/sys-message.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private sysMessage: SysMessageService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async login(payload: LoginDto) {
    const user = await this.prismaService.user.findUnique({
      where: { phoneNumber: payload.phoneNumber },
    });

    if (!user) {
      throw new BadRequestException(
        this.sysMessage.getErrorMessage(ModelSchema.User.phoneNumber, 'not_exist'),
      );
    }

    const isMatchPassword = await bcrypt.compare(
      payload.password,
      user.password,
    );

    if (!isMatchPassword) {
      throw new BadRequestException(
        this.sysMessage.getErrorMessage(ModelSchema.User.password, 'not_match'),
      );
    }

    const jwtPayload: JwtPayload = {
      userId: user.id,
    };

    const token = await this.jwtService.signAsync(jwtPayload);

    return { ...user, password: undefined, token };
  }

  async register(payload: RegisterDto) {
    payload.password = await this.hashPassword(payload.password);
    return await this.userService.create(payload);
  }
}
