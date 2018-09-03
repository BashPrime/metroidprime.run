import { Router } from 'express';
import { Controller } from './controller';
import { UserController } from './user';
import { AuthController } from './auth';
import { NewsController } from './news';
import { RecordController } from './record';

export class ApiController extends Controller {
    protected model;
    private userController = new UserController();
    private authController = new AuthController();
    private newsController = new NewsController();
    private recordController = new RecordController();

    constructor() {
        super();
        this.model = null;

        // Define node API routes here
        this.router.use('/users', this.userController.router);
        this.router.use('/authenticate', this.authController.router);
        this.router.use('/news', this.newsController.router);
        // this.router.use('/leaderboards', require('./leaderboards'));
        this.router.use('/records', this.recordController.router);
    }
}
