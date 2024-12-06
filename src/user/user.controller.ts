import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  RequestCustom,
  ResponseCustom,
  ResponseData,
} from 'src/common/types/http';
import { UpdateUserDto } from './dto/update-user.dto';
import { ModelSchema } from 'src/common/constants/model';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { SysMessageService } from 'src/sys-message/sys-message.service';

@Controller('/api/user')
export class UserController {
  constructor(
    private userService: UserService,
    private sysMessage: SysMessageService,
  ) {}

  @UseGuards(AuthGuard)
  @Post('/')
  async create(@Body() payload: CreateUserDto, @Res() res: ResponseCustom) {
    const user = await this.userService.create(payload);

    const response: ResponseData = {
      success: true,
      data: user,
      message: this.sysMessage.getSuccessMessage(
        ModelSchema.User.entity,
        'create',
      ),
      statusCode: 201,
    };

    return res.status(201).send(response);
  }

  @UseGuards(AuthGuard)
  @Put('/:id')
  async update(
    @Body() payload: UpdateUserDto,
    @Res() res: ResponseCustom,
    @Req() req: RequestCustom,
  ) {
    const id = req.params.id as string;

    const user = await this.userService.update(id, payload);

    const response: ResponseData = {
      success: true,
      data: user,
      message: this.sysMessage.getSuccessMessage(
        ModelSchema.User.entity,
        'update',
      ),
      statusCode: 200,
    };

    return res.status(200).send(response);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  async delete(@Res() res: ResponseCustom, @Req() req: RequestCustom) {
    const id = req.params.id as string;

    const user = await this.userService.delete(id);

    const response: ResponseData = {
      success: true,
      data: user,
      message: this.sysMessage.getSuccessMessage(
        ModelSchema.User.entity,
        'delete',
      ),
      statusCode: 200,
    };

    return res.status(200).send(response);
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  async retrieve(@Res() res: ResponseCustom, @Req() req: RequestCustom) {
    const id = req.params.id as string;

    const user = await this.userService.retrieveById(id);

    const response: ResponseData = {
      success: true,
      data: user,
      message: this.sysMessage.getSuccessMessage(ModelSchema.User.entity),
      statusCode: 200,
    };

    return res.status(201).send(response);
  }

  @UseGuards(AuthGuard)
  @Get('/')
  async list(@Res() res: ResponseCustom, @Req() req: RequestCustom) {
    const query = req.query as any;

    const user = await this.userService.list(query);

    const response: ResponseData = {
      success: true,
      data: user,
      message: this.sysMessage.getSuccessMessage(ModelSchema.User.entity),
      statusCode: 200,
    };

    return res.status(201).send(response);
  }
}
