import { getRepository, Repository } from 'typeorm';
import IUsersRepository from '../../repositories/IUsersRepository';
import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import ICreateAdminDTO from '../../dtos/ICreateAdminDTO';
import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async createUser({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({ name, email, password });

    await this.ormRepository.save(user);

    return user;
  }

  public async createAdmin({
    name,
    email,
    password,
  }: ICreateAdminDTO): Promise<User> {
    const admin = this.ormRepository.create({
      name,
      email,
      password,
      admin: true,
    });

    await this.ormRepository.save(admin);

    return admin;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.ormRepository.findOne({ where: { email } });
  }

  public async findById(id: string): Promise<User | undefined> {
    return this.ormRepository.findOne(id);
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.softDelete(id);
  }
}

export default UsersRepository;
