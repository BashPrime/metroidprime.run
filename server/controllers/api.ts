import { Request, Response, NextFunction } from 'express';
import { DbConnector } from '../dbConnector';
import { Controller } from './controller';
import { UserController } from './user';
import { AuthController } from './auth';
import { NewsController } from './news';
import { RecordController } from './record';
import { GameController } from './game';
import { GameModel } from '../models/game';
import { PermissionController } from './permission';

export class ApiController extends Controller {
    protected model;
    protected connector: DbConnector;
    private userController: UserController;
    private authController: AuthController;
    private newsController: NewsController;
    private recordController: RecordController;
    private gameController: GameController;
    private permissionController: PermissionController;

    constructor(connector: DbConnector) {
        super();
        this.connector = connector;
        this.model = null;

        // Initialize controllers
        this.userController = new UserController(this.connector);
        this.authController = new AuthController(this.connector);
        this.newsController = new NewsController(this.connector);
        this.recordController = new RecordController(this.connector);
        this.gameController = new GameController(this.connector);
        this.permissionController = new PermissionController(this.connector);

        // Define node API routes here
        this.router.use('/users', this.userController.router);
        this.router.use('/authenticate', this.authController.router);
        this.router.use('/permissions', this.permissionController.router);
        this.router.use('/news', this.newsController.router);
        this.router.use('/games', this.gameController.router);
        // this.router.use('/leaderboards', require('./leaderboards'));
        this.router.use('/records', this.recordController.router);

        // Custom routes
        this.router.get('/articleCategories', (req: Request, res: Response, next: NextFunction) => {
          const gameModel = new GameModel(this.connector);
          gameModel.getArticleCategories((err, categories) => {
            if (err) {
                return next(err);
            }
            return res.json({
                data: categories
            });
        });
      });
    }
}
