import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAdminService from '../services/CreateAdminService';
import DeleteUserAdminService from '../services/DeleteUserService';
import UpdateUserAdminService from '../services/UpdateUserService';

export default class adminsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateAdminService);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.json(user);
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

    return response.json(admin);
  }
}
