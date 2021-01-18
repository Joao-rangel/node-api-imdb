import User from '../typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import ICreateAdminDTO from '../dtos/ICreateAdminDTO';

export default interface IUsersRepository {
  createUser(user: ICreateUserDTO): Promise<User>;
  createAdmin(user: ICreateAdminDTO): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(email: string): Promise<User | undefined>;
  save(user: User): Promise<User>;
  delete(id: string): Promise<void>;
}
