import { Game } from './game';
import { User } from './user';

export interface GameArticle {
    id: number;
    slug: string;
    title: string;
    description: string;
    content: GameArticleSection[];
    game: Game;
    category: GameArticleCategory;
    last_updated_user: User;
    last_updated_date: string;
}

export interface GameArticleSection {
    type: SectionType;
    markdown: string;
    youtubeId: string;
}

export interface GameArticleCategory {
    id: number;
    name: string;
    abbreviation: string;
}

export enum SectionType {
    MARKDOWN = 'markdown',
    YOUTUBE = 'youtube'
}