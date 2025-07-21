import React, { useState } from 'react';
import {
    ArrowLeft, Youtube, Users2, CalendarDays, Wrench, Download, ExternalLink,
    Sparkles, Lightbulb, Loader2, AlertTriangle
} from 'lucide-react';

interface GameDetailPageProps {
    game: {
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
    };
    navigateTo: (page: string, gameId?: string | null) => void;
}

export default function GameDetailPage({ game, navigateTo }: GameDetailPageProps) {
    const [enhancedDescription, setEnhancedDescription] = useState('');
    const [isEnhancing, setIsEnhancing] = useState(false);
    const [enhanceError, setEnhanceError] = useState('');

    const [generatedIdea, setGeneratedIdea] = useState<{
        title: string;
        description: string;
        genre: string;
        platform: string;
    } | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generateError, setGenerateError] = useState('');

    const apiKey = ""; // APIキーは環境によって提供されるため空文字

    // 機能1: ゲーム説明をAIで豊かにする
    const handleEnhanceDescription = async () => {
        setIsEnhancing(true);
        setEnhancedDescription('');
        setEnhanceError('');
        const prompt = `ゲームの説明文です: 「${game.longDescription}」 この説明文を、より詳細で魅力的で、読者がワクワクするような文章に書き換えてください。ただし、元のゲームの本質的な内容は変えないでください。`;

        try {
            const chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
            const payload = { contents: chatHistory };
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("API Error Data:", errorData);
                throw new Error(`APIリクエストに失敗しました: ${response.status} ${response.statusText}. ${errorData?.error?.message || ''}`);
            }

            const result = await response.json();

            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                setEnhancedDescription(result.candidates[0].content.parts[0].text);
            } else {
                console.error("Unexpected API response structure:", result);
                throw new Error('AIからの有効な説明が取得できませんでした。');
            }
        } catch (error) {
            console.error("説明の強化中にエラー発生:", error);
            setEnhanceError(`エラー: ${(error as Error).message}`);
        } finally {
            setIsEnhancing(false);
        }
    };

    // 機能2: 新しいゲームのアイデアを生成
    const handleGenerateGameIdea = async () => {
        setIsGenerating(true);
        setGeneratedIdea(null);
        setGenerateError('');
        const prompt = `大学生のゲーム開発サークル向けの、面白くてユニークな新しいゲームのアイデアを1つ提案してください。現在のゲーム「${game.title}」のジャンル「${game.genre}」を参考にしても良いでしょう。`;

        const schema = {
            type: "OBJECT",
            properties: {
                title: { "type": "STRING", "description": "生成されたゲームのタイトル" },
                description: { "type": "STRING", "description": "ゲームの短い説明文" },
                genre: { "type": "STRING", "description": "ゲームの主なジャンル" },
                platform: { "type": "STRING", "description": "ターゲットとするプラットフォーム (例: PC, スマートフォン)" }
            },
            required: ["title", "description", "genre", "platform"]
        };

        try {
            const chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
            const payload = {
                contents: chatHistory,
                generationConfig: {
                    responseMimeType: "application/json",
                    responseSchema: schema
                }
            };
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("API Error Data:", errorData);
                throw new Error(`APIリクエストに失敗しました: ${response.status} ${response.statusText}. ${errorData?.error?.message || ''}`);
            }

            const result = await response.json();

            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                const parsedJson = JSON.parse(result.candidates[0].content.parts[0].text);
                setGeneratedIdea(parsedJson);
            } else {
                console.error("Unexpected API response structure for game idea:", result);
                throw new Error('AIからの有効なゲームアイデアが取得できませんでした。');
            }
        } catch (error) {
            console.error("ゲームアイデア生成中にエラー発生:", error);
            setGenerateError(`エラー: ${(error as Error).message}`);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="bg-gray-100 py-8">
            <div className="container mx-auto px-2 sm:px-4">
                <button
                    onClick={() => navigateTo('games')}
                    className="mb-6 bg-white hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 flex items-center"
                >
                    <ArrowLeft size={18} className="mr-2" /> ゲーム一覧へ戻る
                </button>
                <article className="bg-white rounded-xl shadow-2xl overflow-hidden">
                    <div className="relative">
                        <img
                            src={game.bannerUrl}
                            alt={`[${game.title}のバナー画像]`}
                            className="w-full h-56 md:h-80 lg:h-96 object-cover"
                            onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = 'https://placehold.co/1200x450/cccccc/999999?text=バナーなし&font=sans-serif';
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-6 md:p-10">
                            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 shadow-text">{game.title}</h1>
                            <div className="flex flex-wrap gap-2">
                                <span className="bg-red-600 text-white text-xs sm:text-sm font-semibold px-3 py-1 rounded-full shadow-md">{game.genre}</span>
                                <span className="bg-blue-600 text-white text-xs sm:text-sm font-semibold px-3 py-1 rounded-full shadow-md">{game.platform}</span>
                                <span className="bg-green-600 text-white text-xs sm:text-sm font-semibold px-3 py-1 rounded-full shadow-md">{game.releaseYear}年リリース</span>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 md:p-10">
                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-3">ゲーム概要</h2>
                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{game.longDescription}</p>

                            <button
                                onClick={handleEnhanceDescription}
                                disabled={isEnhancing}
                                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 flex items-center disabled:opacity-50"
                            >
                                <Sparkles size={18} className="mr-2" />
                                {isEnhancing ? (
                                    <>
                                        <Loader2 size={18} className="mr-2 loading-spinner" />
                                        処理中...
                                    </>
                                ) : (
                                    '✨ AIで説明を豊かにする'
                                )}
                            </button>
                            {enhanceError && (
                                <p className="mt-2 text-sm text-red-600 flex items-center">
                                    <AlertTriangle size={16} className="mr-1" />
                                    {enhanceError}
                                </p>
                            )}
                            {enhancedDescription && (
                                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md gemini-output">
                                    <h3 className="text-lg font-semibold text-blue-700 mb-2">AIによる説明文：</h3>
                                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">{enhancedDescription}</p>
                                </div>
                            )}
                        </section>

                        <section className="my-8 pt-6 border-t border-gray-200">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-3">新しいゲームのアイデアを探す</h2>
                            <button
                                onClick={handleGenerateGameIdea}
                                disabled={isGenerating}
                                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 flex items-center disabled:opacity-50"
                            >
                                <Lightbulb size={18} className="mr-2" />
                                {isGenerating ? (
                                    <>
                                        <Loader2 size={18} className="mr-2 loading-spinner" />
                                        生成中...
                                    </>
                                ) : (
                                    '✨ 新しいゲームのアイデアを生成'
                                )}
                            </button>
                            {generateError && (
                                <p className="mt-2 text-sm text-red-600 flex items-center">
                                    <AlertTriangle size={16} className="mr-1" />
                                    {generateError}
                                </p>
                            )}
                            {generatedIdea && (
                                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md gemini-output">
                                    <h3 className="text-xl font-bold text-green-700 mb-2">{generatedIdea.title}</h3>
                                    <p className="text-sm text-gray-500 mb-1"><strong>ジャンル:</strong> {generatedIdea.genre}</p>
                                    <p className="text-sm text-gray-500 mb-3"><strong>プラットフォーム:</strong> {generatedIdea.platform}</p>
                                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">{generatedIdea.description}</p>
                                </div>
                            )}
                        </section>

                        {game.videoUrl && (
                            <section className="mb-8 pt-6 border-t border-gray-200">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                                    <Youtube size={24} className="mr-2 text-red-600" />
                                    紹介動画
                                </h2>
                                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
                                    <iframe
                                        src={game.videoUrl.replace("watch?v=", "embed/")}
                                        title={`${game.title} 紹介動画`}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="w-full h-full"
                                    ></iframe>
                                </div>
                            </section>
                        )}

                        {game.gallery && game.gallery.length > 0 && (
                            <section className="mb-8 pt-6 border-t border-gray-200">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">ギャラリー</h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {game.gallery.map((imgUrl, index) => (
                                        <img
                                            key={index}
                                            src={imgUrl}
                                            alt={`[${game.title}ギャラリー画像 ${index + 1}]`}
                                            className="w-full h-auto object-cover rounded-lg shadow-md hover:opacity-80 transition-opacity duration-300 cursor-pointer"
                                            onError={(e) => {
                                                e.currentTarget.onerror = null;
                                                e.currentTarget.src = 'https://placehold.co/600x338/cccccc/999999?text=画像なし&font=sans-serif';
                                            }}
                                            onClick={() => window.open(imgUrl, '_blank')}
                                        />
                                    ))}
                                </div>
                            </section>
                        )}

                        <section className="grid md:grid-cols-2 gap-x-8 gap-y-6 mb-8 bg-gray-50 p-6 rounded-lg pt-6 border-t border-gray-200 mt-8">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
                                    <Users2 size={20} className="mr-2 text-blue-600" />
                                    開発チーム
                                </h3>
                                <ul className="list-disc list-inside text-gray-600 text-sm">
                                    {game.teamMembers ?
                                        game.teamMembers.map(member => <li key={member}>{member}</li>) :
                                        <li>情報なし</li>
                                    }
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
                                    <CalendarDays size={20} className="mr-2 text-green-600" />
                                    開発期間
                                </h3>
                                <p className="text-gray-600 text-sm">{game.developmentPeriod || '情報なし'}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
                                    <Wrench size={20} className="mr-2 text-purple-600" />
                                    使用技術
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    {game.technologies ? game.technologies.join(', ') : '情報なし'}
                                </p>
                            </div>
                        </section>

                        {game.downloadLink && game.downloadLink !== '#' && (
                            <div className="text-center mt-10">
                                <a
                                    href={game.downloadLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-300 transform hover:scale-105 inline-flex items-center text-lg"
                                >
                                    <Download size={22} className="mr-2" />
                                    ゲームをプレイ / ダウンロード
                                    <ExternalLink size={18} className="ml-2" />
                                </a>
                            </div>
                        )}
                    </div>
                </article>
            </div>
        </div>
    );
}
