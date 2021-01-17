import { injectable, inject } from 'tsyringe';

import User from '../typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

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
    const admin = await this.usersRepository.createAdmin({
      name,
      email,
      password,
    });

    return admin;
  }
}

export default CreateUserService;
