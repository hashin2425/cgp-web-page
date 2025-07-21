import React from 'react';
import { Mail, Sparkles, Users2, Trophy, Lightbulb } from 'lucide-react';
import { clubInfo } from '@/data/clubInfo';

interface AboutPageProps {
    navigateTo: (page: string, gameId?: string | null) => void;
}

export default function AboutPage({ navigateTo }: AboutPageProps) {
    const strengths = [
        {
            icon: <Sparkles size={24} className="text-yellow-500" />,
            title: "初心者大歓迎！",
            description: "ゲーム制作の経験は問いません。プログラミング、デザイン、企画、音楽など、あなたの「好き」を活かせます。先輩たちが丁寧にサポートします！"
        },
        {
            icon: <Users2 size={24} className="text-blue-500" />,
            title: "多様な仲間とチーム制作",
            description: "様々なスキルを持つメンバーとチームを組み、アイデアを出し合いながら一つのゲームを創り上げる達成感を味わえます。"
        },
        {
            icon: <Trophy size={24} className="text-green-500" />,
            title: "コンテスト挑戦＆実績",
            description: "日本ゲーム大賞やPERACONなど、外部のコンテストにも積極的に挑戦。過去には多数の受賞実績があります。"
        },
        {
            icon: <Lightbulb size={24} className="text-purple-500" />,
            title: "充実した学習環境",
            description: "定期的な勉強会やワークショップでスキルアップ。夏には新入生向けの集中ゲーム制作期間も設けています。"
        },
    ];

    return (
        <div className="container mx-auto px-4 py-12">
            <header className="text-center mb-12">
                <h1 className="text-4xl font-bold text-red-600 mb-3">CGPについて</h1>
                <p className="text-xl text-gray-600">{clubInfo.tagline}</p>
            </header>

            <section className="bg-white p-8 rounded-xl shadow-lg mb-12">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">私たちのミッション</h2>
                <p className="text-gray-700 leading-relaxed mb-4">{clubInfo.description}</p>
                <p className="text-gray-700 leading-relaxed">
                    私たちは、メンバー一人ひとりが創造性を存分に発揮し、技術を磨き、そして何よりもゲーム制作を心から楽しむことを大切にしています。
                    和歌山大学から、世界に通用するような面白いゲームを発信していくことが私たちの夢です。
                </p>
            </section>

            <section className="mb-12">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">CGPの強み</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    {strengths.map((strength, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-center mb-3">
                                {strength.icon}
                                <h3 className="text-xl font-semibold text-gray-800 ml-3">{strength.title}</h3>
                            </div>
                            <p className="text-gray-600">{strength.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="text-center bg-gray-100 p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">一緒にゲームを作りませんか？</h2>
                <p className="text-gray-700 mb-6">
                    CGPはいつでも新しい仲間を募集しています！少しでも興味を持ったら、お気軽にお問い合わせください。
                </p>
                <button
                    onClick={() => navigateTo('contact')}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
                >
                    <Mail className="inline-block mr-2" /> お問い合わせはこちら
                </button>
            </section>
        </div>
    );
}
