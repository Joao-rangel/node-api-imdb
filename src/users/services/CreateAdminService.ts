import { injectable, inject } from 'tsyringe';

import User from '../typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import AppError from '../../shared/errors/AppError';

interface IRequest {
  name: string;
  email: string;
  password: string;
}
@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const emailExists = await this.usersRepository.findByEmail(email);

    if (emailExists) throw new AppError('Email already registered.');

    const hashedPassword = await this.hashProvider.generateHash(password);

    const admin = await this.usersRepository.createAdmin({
      name,
      email,
      password: hashedPassword,
    });

    return admin;
  }
}

export default CreateUserService;
