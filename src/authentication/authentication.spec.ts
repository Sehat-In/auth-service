import { Test, TestingModule } from '@nestjs/testing';
import { Authentication } from './authentication.service';

describe('Authentication', () => {
  let provider: Authentication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Authentication],
    }).compile();

    provider = module.get<Authentication>(Authentication);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
