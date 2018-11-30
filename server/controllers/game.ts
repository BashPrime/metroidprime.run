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

        this.router.get('/:value', (req: Request, res: Response, next: NextFunction) => {
            this.getGameByValue(req, res, next);
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

    getGameByValue(req, res, next) {
        this.model.getGameByValue(req.params.value, (err, game) => {
            if (err) {
                return next(err);
            } else if (!game) {
                return res.json({});
            }

            return res.json(game);
        });
    }
}
