'use client'
import React, { useState, useEffect } from 'react';

// コンポーネントのインポート
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomePage from '@/components/pages/HomePage';
import AboutPage from '@/components/pages/AboutPage';
import GamesListPage from '@/components/pages/GamesListPage';
import GameDetailPage from '@/components/pages/GameDetailPage';
import NewsPage from '@/components/pages/NewsPage';
import ContactPage from '@/components/pages/ContactPage';

// データとスタイルのインポート
import { initialGamesData } from '@/data/gamesData';
import { globalStyles } from '@/styles/globalStyles';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigateTo = (page: string, gameId: string | null = null) => {
    setCurrentPage(page);
    setSelectedGameId(gameId);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const selectedGame = initialGamesData.find(game => game.id === selectedGameId);

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = globalStyles;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-['Noto_Sans_JP',_sans-serif]">
      <Navbar
        navigateTo={navigateTo}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <main className={`pt-16 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-30' : 'opacity-100'}`}>
        {currentPage === 'home' && <HomePage navigateTo={navigateTo} />}
        {currentPage === 'about' && <AboutPage navigateTo={navigateTo} />}
        {currentPage === 'games' && <GamesListPage games={initialGamesData} navigateTo={navigateTo} />}
        {currentPage === 'gameDetail' && selectedGame && <GameDetailPage game={selectedGame} navigateTo={navigateTo} />}
        {currentPage === 'news' && <NewsPage navigateTo={navigateTo} />}
        {currentPage === 'contact' && <ContactPage navigateTo={navigateTo} />}
        {currentPage === 'gameDetail' && !selectedGame && (
          <div className="container mx-auto px-4 py-16 text-center">
            <h2 className="text-3xl font-bold text-red-600 mb-4">お探しのゲームは見つかりませんでした。</h2>
            <button onClick={() => navigateTo('games')} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300">ゲーム一覧へ戻る</button>
          </div>
        )}
      </main>
      <Footer navigateTo={navigateTo} />
    </div>
  );
}
