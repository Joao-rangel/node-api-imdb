import { injectable, inject } from 'tsyringe';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import IUsersRepository from '../repositories/IUsersRepository';
import User from '../typeorm/entities/User';

interface IRequest {
  id: string;
  name?: string;
  email?: string;
  password?: string;
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ id, name, email, password }: IRequest): Promise<User> {
    const user = new User();

    if (password) {
      const hashedPassword = await this.hashProvider.generateHash(password);

      Object.assign(user, { password: hashedPassword });
    }

    Object.assign(user, { id, name, email });

    const updatedUser = await this.usersRepository.save(user);

    return updatedUser;
  }
}

export default UpdateUserService;
