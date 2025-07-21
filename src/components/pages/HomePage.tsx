import React from 'react';
import { Gamepad2, ChevronRight } from 'lucide-react';
import GameCard from '@/components/GameCard';
import NewsCard from '@/components/NewsCard';
import { clubInfo } from '@/data/clubInfo';
import { initialGamesData } from '@/data/gamesData';
import { newsData } from '@/data/newsData';

interface HomePageProps {
    navigateTo: (page: string, gameId?: string | null) => void;
}

export default function HomePage({ navigateTo }: HomePageProps) {
    const featuredGames = initialGamesData.slice(0, 2);

    return (
        <>
            <section className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-20 md:py-32">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-down">{clubInfo.name}</h1>
                    <p className="text-xl md:text-3xl mb-8 animate-fade-in-up delay-200">{clubInfo.tagline}</p>
                    <button
                        onClick={() => navigateTo('games')}
                        className="bg-white text-red-600 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105 animate-bounce-slow"
                    >
                        <Gamepad2 className="inline-block mr-2 mb-0.5" /> 制作ゲームを見る
                    </button>
                </div>
            </section>

            <section className="py-16 bg-white">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-6 text-red-600">CGPへようこそ！</h2>
                    <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
                        {clubInfo.description.substring(0, 150)}...
                    </p>
                    <button
                        onClick={() => navigateTo('about')}
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 flex items-center mx-auto"
                    >
                        もっと詳しく <ChevronRight size={20} className="ml-1" />
                    </button>
                </div>
            </section>

            <section className="py-16 bg-gray-100">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">注目のゲーム</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {featuredGames.map(game => (
                            <GameCard key={game.id} game={game} navigateTo={navigateTo} isFeatured={true} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 bg-white">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">最新ニュース</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {newsData.slice(0, 4).map(newsItem => (
                            <NewsCard key={newsItem.id} newsItem={newsItem} navigateTo={navigateTo} isTeaser={true} />
                        ))}
                    </div>
                    <div className="text-center mt-10">
                        <button
                            onClick={() => navigateTo('news')}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 flex items-center mx-auto"
                        >
                            すべてのニュースを見る <ChevronRight size={20} className="ml-1" />
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}
