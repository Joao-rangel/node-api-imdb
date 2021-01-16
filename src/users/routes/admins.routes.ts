import { Router } from 'express';

import AdminsController from '../controllers/AdminsController';

const adminsRouter = Router();
const adminsController = new AdminsController();

adminsRouter.post('/', adminsController.create);
adminsRouter.delete('/:id', adminsController.delete);
adminsRouter.put('/:id', adminsController.update);

export default adminsRouter;
