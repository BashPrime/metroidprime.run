import { Router } from 'express';
import { UserController } from './userController';

export class ApiController {
    router: Router = Router();

    constructor() {
        // Define node API routes here
        this.router.use('/users', new UserController().router);
        // this.router.use('/authenticate', require('./auth'));
        // this.router.use('/news', require('./news'));
        // this.router.use('/leaderboards', require('./leaderboards'));
        // this.router.use('/records', require('./records'));
    }
}
