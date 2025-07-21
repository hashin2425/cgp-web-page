import React from 'react';
import GameCard from '@/components/GameCard';

interface GamesListPageProps {
    games: Array<{
        id: string;
        title: string;
        imageUrl: string;
        platform: string;
        genre: string;
        releaseYear: number;
        shortDescription: string;
    }>;
    navigateTo: (page: string, gameId?: string | null) => void;
}

export default function GamesListPage({ games, navigateTo }: GamesListPageProps) {
    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-10 text-center text-red-600">制作ゲーム一覧</h1>
            {games.length === 0 ? (
                <p className="text-center text-gray-600 text-xl">現在公開中のゲームはありません。</p>
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                    {games.map(game => (
                        <GameCard key={game.id} game={game} navigateTo={navigateTo} />
                    ))}
                </div>
            )}
        </div>
    );
}
