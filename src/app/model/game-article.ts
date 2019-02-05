import { User } from './user';
import { Game } from './game';

export class GameArticle {
  id: number;
  name: string;
  title: string;
  description: string;
  content: GameArticleSection[];
  game: Game;
  category: GameArticleCategory;
  last_updated_user: User;
  last_updated_date: Date;
}

export class GameArticleSection {
  type: SectionType;
  markdown: string;
  youtubeId: string;
}

export class GameArticleCategory {
  id: number;
  name: string;
  abbreviation: string;
}

export enum SectionType {
  MARKDOWN = 'markdown',
  YOUTUBE = 'youtube'
}
