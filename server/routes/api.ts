import { Router } from 'express';
import { Hello } from './hello';

export class Api {
    router: Router = Router();

    constructor() {
        // Define node API routes here
        // this.router.use('/users', require('./users'));
        // this.router.use('/authenticate', require('./auth'));
        // this.router.use('/news', require('./news'));
        // this.router.use('/leaderboards', require('./leaderboards'));
        // this.router.use('/records', require('./records'));
        this.router.use('/hello', new Hello().router);
    }
}
