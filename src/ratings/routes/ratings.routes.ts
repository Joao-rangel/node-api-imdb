import { Router } from 'express';
import ensureAuthentication from '../../shared/middlewares/ensureAuthentication';

import RatingsController from '../controllers/RatingsController';

const ratingsRouter = Router();
const ratingsController = new RatingsController();

ratingsRouter.use(ensureAuthentication);

ratingsRouter.post('/', ratingsController.create);
ratingsRouter.get('/:id', ratingsController.show);

export default ratingsRouter;
