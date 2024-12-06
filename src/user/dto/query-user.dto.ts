import { Prisma } from '@prisma/client';
import { BaseQueryDto } from 'src/common/base/base-query.dto';

export class QueryUserDto extends BaseQueryDto<Prisma.UserSelect> {}
