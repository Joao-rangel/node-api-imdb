import { Request, Response } from 'express';
import { Serializer } from 'jsonapi-serializer';
import { container } from 'tsyringe';

import AuthenticateSessionService from '../services/AuthenticateSessionService';

export default class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateSessionService);

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    const userSerializer = new Serializer('users', {
      attributes: ['name', 'email', 'created_at'],
    });

    return response.json({
      ...userSerializer.serialize(user),
      token,
    });
  }
}
