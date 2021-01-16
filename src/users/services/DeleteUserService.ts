import { injectable, inject } from 'tsyringe';

import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}

export default DeleteUserService;
