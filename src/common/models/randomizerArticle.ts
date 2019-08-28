import { Randomizer } from './randomizer';
import { User } from './user';

export interface RandomizerArticle {
    id: number;
    slug: string;
    title: string;
    description: string;
    content: RandomizerArticleSection[];
    randomizer: Randomizer;
    category: RandomizerArticleCategory;
    last_updated_user: User;
    last_updated_date: string;
}

export interface RandomizerArticleSection {
    type: SectionType;
    markdown: string;
    youtubeId: string;
}

export interface RandomizerArticleCategory {
    id: number;
    name: string;
    abbreviation: string;
}

export enum SectionType {
    MARKDOWN = 'markdown',
    YOUTUBE = 'youtube'
}