import { Test, TestingModule } from '@nestjs/testing';
import { FooController } from './foo.controller';
import { FooService } from './foo.service';

describe('FooController', () => {
  let controller: FooController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FooController],
      providers: [FooService],
    }).compile();

    controller = module.get<FooController>(FooController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
