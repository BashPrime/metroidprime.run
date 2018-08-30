import { Router } from 'express';

export class Api {
    router: Router;

    constructor() {
        // Define node API routes here
        this.router.use('/users', require('./users'));
        this.router.use('/authenticate', require('./auth'));
        this.router.use('/news', require('./news'));
        this.router.use('/leaderboards', require('./leaderboards'));
        this.router.use('/records', require('./records'));
    }
}
