import { Request, Response } from 'express';
import { Serializer } from 'jsonapi-serializer';
import { container } from 'tsyringe';

import CreateAdminService from '../services/CreateAdminService';
import DeleteUserAdminService from '../services/DeleteUserService';
import UpdateUserAdminService from '../services/UpdateUserService';

export default class AdminsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateAdminService);

    const admin = await createUser.execute({
      name,
      email,
      password,
    });

    const userSerializer = new Serializer('users', {
      attributes: ['name', 'email', 'admin', 'created_at'],
    });

    return userSerializer.serialize(admin);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteAdmin = container.resolve(DeleteUserAdminService);

    await deleteAdmin.execute(id);

    return response.status(204).send();
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email, password } = request.body;

    const updateAdmin = container.resolve(UpdateUserAdminService);

    const admin = await updateAdmin.execute({
      id,
      name,
      email,
      password,
    });

    const userSerializer = new Serializer('users', {
      attributes: ['name', 'email', 'admin', 'created_at'],
    });

    return userSerializer.serialize(admin);
  }
}
