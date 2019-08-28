import { Router } from 'express';
import * as news from '../models/news';

const router = Router();

// Define routes
router.get('/', (req, res) => {
    news.getAll()
    .then(news => res.json(news));
});

// Get game by abbreviation
router.get('/:slug', (req, res) => {
    news.getOneBySlug(req.params.slug)
    .then(newsItem => res.json(newsItem));
});

export default router;