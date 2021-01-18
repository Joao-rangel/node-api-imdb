import { Router } from 'express';
import ensureAuthentication from '../../shared/middlewares/ensureAuthentication';

import MoviesController from '../controllers/MoviesController';

const moviesRouter = Router();
const moviesController = new MoviesController();

moviesRouter.use(ensureAuthentication);

moviesRouter.post('/', moviesController.create);
moviesRouter.get('/:id', moviesController.show);
moviesRouter.get('/', moviesController.index);

export default moviesRouter;
