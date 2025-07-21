import React from 'react';
import { clubInfo } from '@/data/clubInfo';

interface FooterProps {
    navigateTo: (page: string, gameId?: string | null) => void;
}

export default function Footer({ navigateTo }: FooterProps) {
    return (
        <footer className="bg-gray-800 text-gray-300 py-10 border-t-4 border-red-600">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-3">{clubInfo.name}</h3>
                        <p className="text-sm mb-3">{clubInfo.tagline}</p>
                        <p className="text-sm">和歌山大学 学生自主創造支援プロジェクト</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-3">サイトマップ</h3>
                        <ul className="space-y-1 text-sm">
                            <li><a onClick={() => navigateTo('home')} className="hover:text-red-400 cursor-pointer">ホーム</a></li>
                            <li><a onClick={() => navigateTo('about')} className="hover:text-red-400 cursor-pointer">CGPについて</a></li>
                            <li><a onClick={() => navigateTo('games')} className="hover:text-red-400 cursor-pointer">ゲーム一覧</a></li>
                            <li><a onClick={() => navigateTo('news')} className="hover:text-red-400 cursor-pointer">ニュース</a></li>
                            <li><a onClick={() => navigateTo('contact')} className="hover:text-red-400 cursor-pointer">お問い合わせ</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-3">関連リンク</h3>
                        <ul className="space-y-1 text-sm">
                            <li><a href="https://www.wakayama-u.ac.jp/crea/" target="_blank" rel="noopener noreferrer" className="hover:text-red-400">和歌山大学クリエ</a></li>
                            <li><a href={clubInfo.officialWebsite} target="_blank" rel="noopener noreferrer" className="hover:text-red-400">CGP公式サイト (Wix)</a></li>
                        </ul>
                    </div>
                </div>
                <div className="text-center text-xs border-t border-gray-700 pt-6">
                    <p>© {new Date().getFullYear()} {clubInfo.name}. All Rights Reserved.</p>
                    <p className="mt-1">このウェブサイトは情報提供を目的として作成されたものです。</p>
                </div>
            </div>
        </footer>
    );
}
