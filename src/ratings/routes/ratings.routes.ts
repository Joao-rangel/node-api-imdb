import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthentication from '../../shared/middlewares/ensureAuthentication';

import RatingsController from '../controllers/RatingsController';

const ratingsRouter = Router();
const ratingsController = new RatingsController();

ratingsRouter.use(ensureAuthentication);

ratingsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      movie_id: Joi.string().uuid().required(),
      user_rating: Joi.number().required(),
    },
  }),
  ratingsController.create,
);

ratingsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  ratingsController.show,
);

export default ratingsRouter;
