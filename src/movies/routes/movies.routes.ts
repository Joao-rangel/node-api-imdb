import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthentication from '../../shared/middlewares/ensureAuthentication';

import MoviesController from '../controllers/MoviesController';

const moviesRouter = Router();
const moviesController = new MoviesController();

moviesRouter.use(ensureAuthentication);

moviesRouter.get('/', moviesController.index);

moviesRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  moviesController.show,
);

moviesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      genre: Joi.string().required(),
      director: Joi.string().required(),
      actors: Joi.string().required(),
    },
  }),
  moviesController.create,
);

export default moviesRouter;
