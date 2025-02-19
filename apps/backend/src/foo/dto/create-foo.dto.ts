import { userSchema, userResponseSchema } from '@repo/shared-types';
import { createZodDto } from 'nestjs-zod';
export class createUserDto extends createZodDto(userSchema) {}
export class userResponseDto extends createZodDto(userResponseSchema) {}
