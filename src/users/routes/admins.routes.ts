import { Router } from 'express';
import ensureAuthentication from '../../shared/middlewares/ensureAuthentication';

import AdminsController from '../controllers/AdminsController';

const adminsRouter = Router();
const adminsController = new AdminsController();

adminsRouter.post('/', adminsController.create);
adminsRouter.delete('/', ensureAuthentication, adminsController.delete);
adminsRouter.put('/', ensureAuthentication, adminsController.update);

export default adminsRouter;
