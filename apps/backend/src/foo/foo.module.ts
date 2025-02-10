import { Module } from '@nestjs/common';
import { FooService } from './foo.service';
import { FooController } from './foo.controller';

@Module({
  controllers: [FooController],
  providers: [FooService],
})
export class FooModule {}
