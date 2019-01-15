import { Request, Response, NextFunction } from 'express';
import * as passport from 'passport';

import { Controller } from './controller';
import { GameModel } from '../models/game';
import { DbConnector } from '../dbConnector';

export class GameController extends Controller {
    protected model: GameModel;

    constructor(connector: DbConnector) {
        super();
        this.model = new GameModel(connector);

        // Define routes
        this.router.get('/', (req: Request, res: Response, next: NextFunction) => {
            this.getGames(req, res, next);
        });

        this.router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
            this.getGameById(req, res, next);
        });

        this.router.get('/:id/articles', (req: Request, res: Response, next: NextFunction) => {
            this.getArticlesForGame(req, res, next);
        });

        this.router.get('/:id/articles/:articleName', (req: Request, res: Response, next: NextFunction) => {
            this.getSingleArticleForGame(req, res, next);
        });

        this.router.post('/:id/create-article', passport.authenticate('jwt', { session: false }), (req: Request, res: Response, next: NextFunction) => {
          this.createArticle(req, res, next);
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
                return res.json({ data: {} });
            }

            return res.json({
                data: game
            });
        });
    }

    getArticlesForGame(req, res, next) {
        this.model.getArticlesForGame(req.params.id, (err, articles) => {
            if (err) {
                return next(err);
            }

            return res.json({
                data: articles
            });
        });
    }

    getSingleArticleForGame(req, res, next) {
        this.model.getSingleArticleForGame(req.params.id, req.params.articleName, (err, article) => {
            if (err) {
                return next(err);
            }

            return res.json({
                data: article
            });
        });
    }

    createArticle(req, res, next) {
      this.model.createArticle(req.body, req.user, req.params.id, (err, article) => {
        if (err) {
            console.log(err);
            return next(err);
        }
        return res.status(200)
            .json({
                success: true,
                message: 'Successfully created article'
            });
      });
    }
}
