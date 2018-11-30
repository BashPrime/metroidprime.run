import { Request, Response, NextFunction } from 'express';
import { Controller } from './controller';
import { GameModel } from '../models/game';

export class GameController extends Controller {
    protected model = new GameModel();

    constructor() {
        super();

        // Define routes
        this.router.get('/', (req: Request, res: Response, next: NextFunction) => {
            this.getGames(req, res, next);
        });
    }

    getGames(req, res, next) {
        this.model.getGames((err, games) => {
            if (err) {
                return next(err);
            }
            return res.json({
                success: true,
                data: games,
            });
        });
    }
}