import { Router } from 'express';
import ensureAuthentication from '../../shared/middlewares/ensureAuthentication';

import UsersController from '../controllers/UsersController';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post('/', usersController.create);
usersRouter.delete('/', ensureAuthentication, usersController.delete);
usersRouter.put('/', ensureAuthentication, usersController.update);

export default usersRouter;
