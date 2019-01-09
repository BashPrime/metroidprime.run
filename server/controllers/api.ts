import { Router } from 'express';
import { DbConnector } from '../dbConnector';
import { Controller } from './controller';
import { UserController } from './user';
import { AuthController } from './auth';
import { NewsController } from './news';
import { RecordController } from './record';
import { GameController } from './game';

export class ApiController extends Controller {
    protected model;
    protected connector = new DbConnector();
    private userController = new UserController(this.connector);
    private authController = new AuthController(this.connector);
    private newsController = new NewsController(this.connector);
    private recordController = new RecordController(this.connector);
    private gameController = new GameController(this.connector);

    constructor() {
        super();
        this.model = null;

        // Define node API routes here
        this.router.use('/users', this.userController.router);
        this.router.use('/authenticate', this.authController.router);
        this.router.use('/news', this.newsController.router);
        this.router.use('/games', this.gameController.router);
        // this.router.use('/leaderboards', require('./leaderboards'));
        this.router.use('/records', this.recordController.router);
    }
}
