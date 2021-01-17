import { Router } from 'express';

import RatingsController from '../controllers/RatingsController';

const ratingsRouter = Router();
const ratingsController = new RatingsController();

ratingsRouter.post('/', ratingsController.create);
ratingsRouter.get('/:id', ratingsController.show);

export default ratingsRouter;
