import React from 'react';
import NewsCard from '@/components/NewsCard';
import { newsData } from '@/data/newsData';

interface NewsPageProps {
    navigateTo: (page: string, gameId?: string | null) => void;
}

export default function NewsPage({ navigateTo }: NewsPageProps) {
    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-10 text-center text-red-600">ニュース & 活動記録</h1>
            <div className="space-y-8 max-w-3xl mx-auto">
                {newsData.length > 0 ?
                    newsData.map(item => (
                        <NewsCard key={item.id} newsItem={item} navigateTo={navigateTo} />
                    )) :
                    <p className="text-center text-gray-600">ニュースはまだありません。</p>
                }
            </div>
        </div>
    );
}
