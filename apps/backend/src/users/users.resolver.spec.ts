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
  let service: UsersService;

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
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('update', () => {
    it('should update an user', async () => {
      const updatedUser = {
        username: 'tom',
        fullname: 'Tom Bombadil',
        bio: 'I am the Bombadil',
      };

      jest.spyOn(service, 'update').mockResolvedValue(updatedUser);

      const result = await resolver.update('9', updatedUser);

      expect(result).toEqual({
        username: 'tom',
        fullname: 'Tom Bombadil',
        bio: 'I am the Bombadil',
      });
    });
  });

  describe('remove', () => {
    it('should delete the user', async () => {
      const id = '2';
      const context = { token: 'fakeAccessToken' };

      jest.spyOn(service, 'userRemove').mockResolvedValue(true);

      const result = await resolver.userRemove(id, context.token);

      expect(result).toBe(true);
    });
  });

  describe('adminRemove', () => {
    it('should delete an user', async () => {
      const id = '3';

      jest.spyOn(service, 'adminRemoveUser').mockResolvedValue(+id);

      const result = await resolver.adminRemoveUser(id);

      expect(result).toEqual(+id);
    });
  });

  describe('updateRole', () => {
    it('should update user`s role', async () => {
      const id = '3';
      const roleId = '2';

      jest.spyOn(service, 'updateRole').mockResolvedValue(+roleId);

      const result = await resolver.updateRole(id, roleId);

      expect(result).toEqual(+roleId);
    });
  });
});
