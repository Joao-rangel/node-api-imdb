import { Router } from 'express';

import MoviesController from '../controllers/MoviesController';

const moviesRouter = Router();
const moviesController = new MoviesController();

moviesRouter.post('/', moviesController.create);
moviesRouter.get('/:id', moviesController.show);
moviesRouter.get('/', moviesController.index);

export default moviesRouter;
