import { Serializer } from 'jsonapi-serializer';
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

    const updatedUser = this.usersRepository.save(user);

    const userSerializer = new Serializer('users', {
      attributes: ['name', 'email', 'updatedAt'],
    });

    return userSerializer.serialize(updatedUser);
  }
}

export default UpdateUserService;
