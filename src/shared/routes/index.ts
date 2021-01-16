import { Router } from 'express';

import usersRouter from '../../users/routes/users.routes';
import adminsRouter from '../../users/routes/admins.routes';
import moviesRouter from '../../movies/routes/movies.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/admins', adminsRouter);
routes.use('/movies', moviesRouter);

export default routes;
