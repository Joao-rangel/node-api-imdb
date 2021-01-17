import { injectable, inject } from 'tsyringe';

import { Serializer } from 'jsonapi-serializer';
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
    const user = await this.usersRepository.createAdmin({
      name,
      email,
      password,
    });

    const userSerializer = new Serializer('users', {
      attributes: ['name', 'email', 'admin', 'createdAt'],
    });

    return userSerializer.serialize(user);
  }
}

export default CreateUserService;
