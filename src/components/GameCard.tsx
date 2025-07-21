import React from 'react';

interface GameCardProps {
    game: {
        id: string;
        title: string;
        imageUrl: string;
        platform: string;
        genre: string;
        releaseYear: number;
        shortDescription: string;
    };
    navigateTo: (page: string, gameId?: string | null) => void;
    isFeatured?: boolean;
}

export default function GameCard({ game, navigateTo, isFeatured = false }: GameCardProps) {
    const cardClasses = `bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 flex flex-col ${isFeatured ? 'md:flex-row' : ''}`;
    const imageContainerClasses = isFeatured ? 'md:w-1/2' : '';
    const contentClasses = isFeatured ? 'md:w-1/2 p-6' : 'p-5';

    return (
        <div className={cardClasses} onClick={() => navigateTo('gameDetail', game.id)}>
            <div className={`relative ${imageContainerClasses}`}>
                <img
                    src={game.imageUrl}
                    alt={`[${game.title}の画像]`}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://placehold.co/400x300/cccccc/999999?text=画像なし&font=sans-serif';
                    }}
                />
                <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded font-semibold">
                    {game.platform}
                </div>
            </div>
            <div className={contentClasses}>
                <h3 className={`font-bold mb-1 ${isFeatured ? 'text-2xl' : 'text-xl'} text-gray-800 hover:text-red-600`}>
                    {game.title}
                </h3>
                <p className="text-xs text-gray-500 mb-2">{game.genre} - {game.releaseYear}年</p>
                <p className={`text-sm text-gray-600 mb-3 ${isFeatured ? 'h-auto' : 'h-16 overflow-hidden text-ellipsis'}`}>
                    {game.shortDescription}
                </p>
                {!isFeatured && (
                    <button className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-3 rounded-md text-sm transition duration-300">
                        詳細を見る
                    </button>
                )}
            </div>
        </div>
    );
}
