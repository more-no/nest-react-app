import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateUserInput } from 'src/graphql';
import { JwtService } from '@nestjs/jwt';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        JwtService,
        {
          provide: JwtService,
          useValue: {
            decode: jest.fn(),
          },
        },
        {
          provide: PrismaService,
          useValue: {
            user: {
              update: jest.fn(),
              deleteMany: jest.fn(),
            },
            session: {
              findFirst: jest.fn(),
              deleteMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);
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

    expect(await service.update(id, dto)).toEqual(expectedResult);
  });

  it('should throw NotFoundException if an error occurs', async () => {
    const id = 3;
    const dto: UpdateUserInput = {
      username: 'new Username',
      fullname: 'new Fullname',
      bio: 'new Bio',
    };

    const error = new Error('Prisma error');

    (prisma.user.update as jest.Mock).mockRejectedValue(error);

    await expect(service.update(id, dto)).rejects.toThrow(NotFoundException);
  });

  it('should delete an user and its session', async () => {
    const userId = 3;
    const accessToken = 'fakeAccessToken';
    const tokenSub = 'tokenSubject';

    // Mock Prisma session.findFirst to return a valid session
    jest.spyOn(prisma.session, 'findFirst').mockResolvedValue({
      id: 3,
      token: 'fakeAccessToken',
      expiryTimestamp: new Date(),
      user_id: userId,
    });

    // Mock JWTService decode to return the token subject
    jest.spyOn(jwtService, 'decode').mockReturnValue({ sub: tokenSub });

    // Mock Prisma user.deleteMany and session.deleteMany to succeed
    jest.spyOn(prisma.user, 'deleteMany').mockResolvedValue({ count: 1 });
    jest.spyOn(prisma.session, 'deleteMany').mockResolvedValue({ count: 1 });

    const result = await service.userRemove(userId, accessToken);

    expect(result).toBe(true);
  });

  it('should throw NotFoundException if session does not exist', async () => {
    const userId = 3;
    const accessToken = 'fakeAccessToken';

    (prisma.session.findFirst as jest.Mock).mockResolvedValue(undefined);

    await expect(service.userRemove(userId, accessToken)).rejects.toThrow(
      NotFoundException,
    );
  });
});
