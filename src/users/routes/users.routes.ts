import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthentication from '../../shared/middlewares/ensureAuthentication';
import UsersController from '../controllers/UsersController';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRouter.delete('/', ensureAuthentication, usersController.delete);

usersRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string(),
    },
  }),
  ensureAuthentication,
  usersController.update,
);

export default usersRouter;
