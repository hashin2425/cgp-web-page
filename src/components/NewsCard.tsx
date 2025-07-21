import React from 'react';
import { ChevronRight } from 'lucide-react';

interface NewsCardProps {
    newsItem: {
        id: number;
        date: string;
        title: string;
        description: string;
        category?: string;
    };
    navigateTo: (page: string, gameId?: string | null) => void;
    isTeaser?: boolean;
}

export default function NewsCard({ newsItem, navigateTo, isTeaser = false }: NewsCardProps) {
    const categoryColors = {
        'イベント': 'bg-blue-100 text-blue-800',
        '活動報告': 'bg-green-100 text-green-800',
        '実績': 'bg-yellow-100 text-yellow-800',
        'お知らせ': 'bg-purple-100 text-purple-800',
    };

    return (
        <article className={`bg-white rounded-lg shadow-lg overflow-hidden ${isTeaser ? 'hover:shadow-xl transition-shadow' : ''}`}>
            <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                    <p className="text-sm text-gray-500">{newsItem.date}</p>
                    {newsItem.category && (
                        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${categoryColors[newsItem.category as keyof typeof categoryColors] || 'bg-gray-100 text-gray-800'}`}>
                            {newsItem.category}
                        </span>
                    )}
                </div>
                <h3
                    className={`font-semibold text-gray-800 ${isTeaser ? 'text-lg' : 'text-xl'} mb-2 hover:text-red-600 cursor-pointer`}
                    onClick={() => { /* Potentially navigate to a full news item page */ }}
                >
                    {newsItem.title}
                </h3>
                <p className={`text-gray-600 text-sm ${isTeaser ? 'h-12 overflow-hidden text-ellipsis' : ''}`}>
                    {newsItem.description}
                </p>
                {!isTeaser && (
                    <button className="text-red-500 hover:text-red-700 font-semibold text-sm mt-3 inline-flex items-center">
                        続きを読む <ChevronRight size={16} className="ml-1" />
                    </button>
                )}
            </div>
        </article>
    );
}
