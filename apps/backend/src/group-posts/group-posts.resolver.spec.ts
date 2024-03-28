import { Test, TestingModule } from '@nestjs/testing';
import { GroupPostsResolver } from './group-posts.resolver';
import { GroupPostsService } from './group-posts.service';

describe('GroupPostsResolver', () => {
  let resolver: GroupPostsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupPostsResolver, GroupPostsService],
    }).compile();

    resolver = module.get<GroupPostsResolver>(GroupPostsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
