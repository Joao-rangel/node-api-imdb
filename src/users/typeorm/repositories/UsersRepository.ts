import { getRepository, Repository } from 'typeorm';
import IUsersRepository from '../../repositories/IUsersRepository';
import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({ name, email, password });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  async delete(user: User): Promise<void> {
    await this.ormRepository.softDelete(user);
  }
}

export default UsersRepository;
