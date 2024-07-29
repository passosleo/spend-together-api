import { User } from '../../entities/user';
import { UserUniqueKeyDTO } from './user-repository.types';

export interface IUserRepository {
  findByUniqueKey(data: UserUniqueKeyDTO): Promise<User | null>;
  findAll(): Promise<User[]>;
  findAllByUsername(username: string, excludeUsername?: string, take?: number): Promise<User[]>;
  create(data: User): Promise<User>;
  update(userId: string, data: Partial<User>): Promise<User>;
  delete(userId: string): Promise<User>;
}
