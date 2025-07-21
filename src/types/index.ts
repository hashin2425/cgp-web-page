// ゲームの型定義
export interface Game {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  imageUrl: string;
  bannerUrl: string;
  genre: string;
  platform: string;
  releaseYear: number;
  teamMembers?: string[];
  technologies?: string[];
  videoUrl?: string;
  gallery?: string[];
  downloadLink?: string;
  developmentPeriod?: string;
}

// ニュースの型定義
export interface NewsItem {
  id: number;
  date: string;
  title: string;
  description: string;
  category?: string;
}

// ナビゲーション関数の型定義
export type NavigateTo = (page: string, gameId?: string | null) => void;
