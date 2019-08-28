import { Router } from 'express';

import gamesController from './controllers/games';
import newsController from './controllers/news';
import randomizersController from './controllers/randomizers';
import * as packageJson from '../../package.json';

export function defineControllers(): Router {
    const router = Router();

    router.get('/', (req, res) => res.send('metroid-prime-randomizer-website API v' + packageJson.version));

    // Define controller-specific routes
    router.use('/games', gamesController);
    router.use('/news', newsController);
    router.use('/randomizers', randomizersController);

    return router;
};
