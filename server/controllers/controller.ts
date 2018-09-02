import { Router } from 'express';
import { Model } from '../models/model';

export abstract class Controller {
    protected abstract model: Model;
    router: Router;

    constructor() {
        this.router = Router();
    }
}
