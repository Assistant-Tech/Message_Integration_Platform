import { PartialType } from '@nestjs/swagger';
import { CreateFooDto } from './create-foo.dto';

export class UpdateFooDto extends PartialType(CreateFooDto) {}
