import { Router } from 'express';

import usersRouter from '../../users/routes/users.routes';
import adminsRouter from '../../users/routes/admins.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/admins', adminsRouter);

export default routes;
