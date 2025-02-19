import { Injectable } from '@nestjs/common';
import { createUserDto, userResponseDto } from './dto/create-foo.dto';
import { IUserResponseType, userResponseSchema } from '@repo/shared-types';
import { randomUUID } from 'crypto';
import { response } from 'express';

@Injectable()
export class FooService {
  create(userPayload: createUserDto) {
    const createdUser = {
      ...userPayload,
      id: randomUUID(),
    };

    return createdUser;
  }
}
