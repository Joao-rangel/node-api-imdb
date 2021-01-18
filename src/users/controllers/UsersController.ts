import { Request, Response } from 'express';
import { Serializer } from 'jsonapi-serializer';
import { container } from 'tsyringe';

import CreateUserService from '../services/CreateUserService';
import DeleteUserService from '../services/DeleteUserService';
import UpdateUserService from '../services/UpdateUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    const userSerializer = new Serializer('users', {
      attributes: ['name', 'email', 'created_at'],
    });

    return response.json(userSerializer.serialize(user));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const deleteUser = container.resolve(DeleteUserService);

    await deleteUser.execute(id);

    return response.status(204).send();
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { name, email, password } = request.body;

    const updateUser = container.resolve(UpdateUserService);

    const user = await updateUser.execute({
      id,
      name,
      email,
      password,
    });

    const userSerializer = new Serializer('users', {
      attributes: ['name', 'email', 'created_at'],
    });

    return response.json(userSerializer.serialize(user));
  }
}
