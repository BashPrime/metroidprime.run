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

        this.router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
            this.getGameById(req, res, next);
        });
    }

    getGames(req, res, next) {
        this.model.getGames((err, games) => {
            if (err) {
                return next(err);
            }
            return res.json({
                data: games
            });
        });
    }

    getGameById(req, res, next) {
        this.model.getDetailedGameById(req.params.id, (err, game) => {
            if (err) {
                return next(err);
            } else if (!game) {
                return res.json({data: {}});
            }

            return res.json({
                data: game
            });
        });
    }
}
