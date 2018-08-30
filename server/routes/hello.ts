import { Router, Request, Response } from 'express';

export class Hello {
    router: Router = Router();

    constructor() {
        // Define routes
        this.router.get('/', this.sayHello);
        this.router.get('/:name', this.sayHelloWithParam);
    }

    private sayHello(req: Request, res: Response) {
        res.send('Hello, world!');
    }

    private sayHelloWithParam(req: Request, res: Response) {
        const { name } = req.params;
        res.send(`Hello, ${name}!`);
    }
}
