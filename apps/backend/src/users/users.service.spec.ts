import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateUserInput } from 'src/graphql';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        JwtService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              update: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should update user info', async () => {
    const id = 3;
    const dto: UpdateUserInput = {
      username: 'new Username',
      fullname: 'new Fullname',
      bio: 'new Bio',
    };

    const expectedResult = {
      username: 'new Username',
      fullname: 'new Fullname',
      bio: 'new Bio',
    };

    (prisma.user.update as jest.Mock).mockResolvedValue(expectedResult);

    const result = await service.update(id, dto);

    expect(result).toEqual(expectedResult);
  });

  it('should throw NotFoundException if an error occurs', async () => {
    const id = 1;
    const dto: UpdateUserInput = {
      username: 'new Username',
      fullname: 'new Fullname',
      bio: 'new Bio',
    };

    const expectedResult = {
      username: 'new Username',
      fullname: 'new Fullname',
      bio: 'new Bio',
    };

    const error = new Error('Prisma error');

    (prisma.user.update as jest.Mock).mockRejectedValue(error);

    await expect(service.update(id, dto)).rejects.toThrow(NotFoundException);
  });
});
