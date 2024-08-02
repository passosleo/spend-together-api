import { User } from '../../domain/entities/user/user';
import { IUserRepository } from '../../domain/repositories/user/user-repository';
import { UserUniqueKeyData } from '../../domain/repositories/user/user-repository.types';

export const UserRepositoryMock: jest.Mocked<IUserRepository> = {
  findByUniqueKey: jest.fn<Promise<User | null>, [UserUniqueKeyData]>(),
  findAll: jest.fn<Promise<User[]>, []>(),
  findAllByUsername: jest.fn<Promise<User[]>, [string, string?, number?]>(),
  create: jest.fn<Promise<User>, [User]>(),
  update: jest.fn<Promise<User>, [string, Partial<User>]>(),
  delete: jest.fn<Promise<User>, [string]>(),
};
