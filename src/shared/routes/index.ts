import { Router } from 'express';

import usersRouter from '../../users/routes/users.routes';
import adminsRouter from '../../users/routes/admins.routes';
import moviesRouter from '../../movies/routes/movies.routes';
import ratingsRouter from '../../ratings/routes/ratings.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/admins', adminsRouter);
routes.use('/movies', moviesRouter);
routes.use('/ratings', ratingsRouter);

export default routes;
