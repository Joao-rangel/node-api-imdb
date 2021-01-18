import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthentication from '../../shared/middlewares/ensureAuthentication';
import AdminsController from '../controllers/AdminsController';

const adminsRouter = Router();
const adminsController = new AdminsController();

adminsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  adminsController.create,
);

adminsRouter.delete('/', ensureAuthentication, adminsController.delete);

adminsRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string(),
    },
  }),
  ensureAuthentication,
  adminsController.update,
);

export default adminsRouter;
