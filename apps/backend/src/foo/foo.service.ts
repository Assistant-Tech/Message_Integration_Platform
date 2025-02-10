import { Injectable } from '@nestjs/common';
import { CreateFooDto } from './dto/create-foo.dto';
import { UpdateFooDto } from './dto/update-foo.dto';

@Injectable()
export class FooService {
  create(createFooDto: CreateFooDto) {
    return 'This action adds a new foo' + JSON.stringify(createFooDto.text);
  }

  findAll() {
    return `This action returns all foo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} foo`;
  }

  update(id: number, updateFooDto: UpdateFooDto) {
    return `This action updates a #${id} foo`;
  }

  remove(id: number) {
    return `This action removes a #${id} foo`;
  }
}
