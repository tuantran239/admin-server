import { Global, Module } from '@nestjs/common';
import { SysMessageService } from './sys-message.service';

@Global()
@Module({
  providers: [SysMessageService],
  exports: [SysMessageService],
})
export class SysMessageModule {}
