import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { ModelSchema } from 'src/common/constants/model';
import { generateId } from 'src/common/utils/generate';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.type';
import { Prisma } from '@prisma/client';
import { SysMessageService } from 'src/sys-message/sys-message.service';

@Injectable()
export class UserService extends BaseService<
  User,
  CreateUserDto,
  UpdateUserDto,
  QueryUserDto,
  Prisma.UserSelect
> {
  constructor(private readonly prisma: PrismaService, private sysMessage: SysMessageService) {
    super();
  }

  async create(
    payload: CreateUserDto,
    select?: Prisma.UserSelect,
  ): Promise<User> {
    const id = generateId('user');

    const userPhoneExist = await this.prisma.user.findUnique({
      where: { phoneNumber: payload.phoneNumber },
    });

    if (userPhoneExist) {
      throw new BadRequestException(
        this.sysMessage.getErrorMessage(ModelSchema.User.phoneNumber, 'existed'),
      );
    }

    return await this.prisma.user.create({
      data: { ...payload, id },
      select,
    });
  }

  async update(
    id: string,
    payload: UpdateUserDto,
    select?: Prisma.UserSelect,
  ): Promise<User> {
    return await this.prisma.user.update({
      where: { id },
      data: { ...payload },
      select,
    });
  }

  async delete(id: string, select?: Prisma.UserSelect): Promise<User> {
    return await this.prisma.user.delete({ where: { id }, select });
  }

  async retrieveById(id: string, select?: Prisma.UserSelect): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id }, select });

    if (!user) {
      throw new NotFoundException(
        this.sysMessage.getErrorMessage(ModelSchema.User.entity, 'not_found'),
      );
    }

    return user;
  }

  async list(query: QueryUserDto): Promise<User[]> {
    const { select } = query;
    return await this.prisma.user.findMany({ ...query });
  }
}
