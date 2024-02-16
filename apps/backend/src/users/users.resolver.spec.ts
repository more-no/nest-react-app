import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { AtGuard } from '../common/guards';
import { RolesGuard } from '../common/guards/role.guard';
import { PrismaService } from '../../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        UsersService,
        PrismaService,
        ConfigService,
        JwtService,
        { provide: AtGuard, useValue: { canActivate: () => true } },
        { provide: RolesGuard, useValue: { canActivate: () => true } },
      ],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('update', () => {
    it('should update an user', async () => {
      const updatedUser = {
        id: '9',
        username: 'tom',
        fullname: 'Tom Bombadil',
        bio: 'I am the Bombadil',
      };

      jest.spyOn(userService, 'update').mockResolvedValue(updatedUser);

      const result = await resolver.update('9', {
        username: 'tom',
        fullname: 'Tom Bombadil',
        bio: 'I am the Bombadil',
      });

      expect(result).toEqual({
        username: 'tom',
        fullname: 'Tom Bombadil',
        bio: 'I am the Bombadil',
      });
    });
  });
});

//   describe('update', () => {
//     it('should update an user', () => {
//       expect(
//         resolver.update('9', {
//           username: 'tom',
//           fullname: 'tom bombadill',
//           bio: 'im the bombadill',
//         }),
//       ).toEqual([
//         {
//           username: 'tom',
//           fullname: 'tom bombadill',
//           bio: 'im the bombadill',
//         },
//       ]);
//     });
//   });
// });
