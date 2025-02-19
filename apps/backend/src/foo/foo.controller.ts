import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { FooService } from './foo.service';
import { createUserDto, userResponseDto } from './dto/create-foo.dto';
import { ZodSerializerDto } from 'nestjs-zod';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('foo')
@Controller('foo')
export class FooController {
  constructor(private readonly fooService: FooService) {}

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, type: userResponseDto })
  @ZodSerializerDto(userResponseDto)
  async create(@Body() userPayload: createUserDto): Promise<userResponseDto> {
    console.log(createUserDto);
    console.log(
      'the actual return from the service',
      this.fooService.create(userPayload),
    );
    return await this.fooService.create(userPayload);
  }
}
