import { injectable, inject } from 'tsyringe';

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
  ) {}

  public async execute({ id, name, email, password }: IRequest): Promise<User> {
    const user = new User();

    Object.assign(user, { id, name, email, password });

    return this.usersRepository.save(user);
  }
}

export default UpdateUserService;
