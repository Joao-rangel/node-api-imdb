import { injectable, inject } from 'tsyringe';

import User from '../typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
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
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const emailExists = this.usersRepository.findByEmail(email);

    if (emailExists) throw new AppError('Email already registered.');

    const user = await this.usersRepository.createUser({
      name,
      email,
      password,
    });

    return user;
  }
}

export default CreateUserService;
