import { Router } from 'express';
import { Controller } from './controller';
import { UserController } from './user';

export class ApiController extends Controller {
    protected model;
    private userController: UserController = new UserController();

    constructor() {
        super();
        this.model = null;

        // Define node API routes here
        this.router.use('/users', this.userController.router);
        // this.router.use('/authenticate', require('./auth'));
        // this.router.use('/news', require('./news'));
        // this.router.use('/leaderboards', require('./leaderboards'));
        // this.router.use('/records', require('./records'));
    }
}
