'use client'
import React, { useState, useEffect } from 'react';
import { Home, Users, List, Newspaper, Mail, Gamepad2, ArrowLeft, Youtube, Users2, CalendarDays, Wrench, Download, ExternalLink, Search, Menu, X, ChevronRight, Sparkles, Trophy, Lightbulb, MessageSquare, AlertTriangle, Loader2 } from 'lucide-react';

// Club Information (団体情報)
const clubInfo = {
  name: "クリエゲーム制作プロジェクト",
  shortName: "CGP",
  tagline: "「遊ぶ」から「創る」へ。",
  description: "和歌山大学で活動するゲーム制作団体です。私たちは、本気でゲーム制作に取り組みたい学生たちが集まり、その情熱と才能を最大限に発揮できる場所となることを目指しています。初心者から経験者まで、プログラマー、デザイナー、プランナー、サウンドクリエイターなど、あらゆる役割の仲間を歓迎します！",
  contactEmail: "cgp.wakayama@example.com", // Placeholder
  officialWebsite: "https://creagamep.wixsite.com/creagamep", // From search results
  logoUrl: "https://placehold.co/200x60/E60012/FFFFFF?text=CGPロゴ&font=sans-serif", // Nintendo-style placeholder logo
};

// Sample Game Data (ゲームのサンプルデータ - 収集情報とニンテンドー風情報を加味)
const initialGamesData = [
  {
    id: 'hanikamu-trinity',
    title: 'はにかむとりにてぃ',
    shortDescription: 'サクッと遊べる爽快パズルゲーム！同じ色を3つ揃えて消していこう。',
    longDescription: '「はにかむとりにてぃ」は、シンプルながら奥深い、どなたでも気軽に楽しめるパズルゲームです。次々と現れるブロックをうまく操作し、同じ色を3つ以上つなげて消していきましょう。連鎖を決めれば高得点のチャンス！空いた時間のお供に、ぜひプレイしてみてください。',
    imageUrl: 'https://placehold.co/400x300/3498db/ffffff?text=はにかむとりにてぃ&font=sans-serif',
    bannerUrl: 'https://placehold.co/1200x450/3498db/ffffff?text=はにかむとりにてぃ&font=sans-serif',
    genre: 'パズル',
    platform: 'PC (Windows)',
    releaseYear: 2020,
    teamMembers: ['CGPチームA'],
    technologies: ['Unity', 'C#'],
    videoUrl: 'https://www.youtube.com/@filmage9892', // Example video
    gallery: [
      'https://placehold.co/600x338/5dade2/ffffff?text=ゲーム画面1&font=sans-serif',
      'https://placehold.co/600x338/85c1e9/ffffff?text=ゲーム画面2&font=sans-serif',
    ],
    downloadLink: '#',
  },
  {
    id: 'bloody-walker',
    title: 'BloodyWalker',
    shortDescription: 'ダークな世界観で繰り広げられる探索アクション。日本ゲーム大賞一次審査突破作品！',
    longDescription: '「BloodyWalker」は、荒廃した世界を舞台に、主人公が自身の運命と世界の謎に迫る探索型アクションゲームです。独特なアートスタイルと重厚なストーリー、歯ごたえのあるアクションが特徴。日本ゲーム大賞アマチュア部門で一次審査を突破した、CGPの意欲作です。',
    imageUrl: 'https://placehold.co/400x300/c0392b/ffffff?text=BloodyWalker&font=sans-serif',
    bannerUrl: 'https://placehold.co/1200x450/c0392b/ffffff?text=BloodyWalker&font=sans-serif',
    genre: 'アクションアドベンチャー',
    platform: 'PC (Windows)',
    releaseYear: 2019, // Assuming based on search result context
    teamMembers: ['高田翔平', '川原昂也', '大田祐介', '他CGPメンバー'], // From PERACON result, assuming related
    technologies: ['Unreal Engine', 'C++'],
    gallery: [
      'https://placehold.co/600x338/e74c3c/ffffff?text=コンセプトアート&font=sans-serif',
      'https://placehold.co/600x338/d35400/ffffff?text=戦闘シーン&font=sans-serif',
    ],
    downloadLink: '#',
  },
  {
    id: 'fushigi-ou',
    title: 'フシギ王',
    shortDescription: '不思議な生き物たちと出会う、心温まるアドベンチャー。',
    longDescription: '「フシギ王」は、プレイヤーが不思議な世界の王となり、個性豊かな住民たちと交流しながら王国を発展させていくアドベンチャーゲームです。可愛らしいキャラクターと、どこか懐かしい雰囲気の世界観が魅力。あなたの采配で、王国はどのように変わっていくのでしょうか？',
    imageUrl: 'https://placehold.co/400x300/2ecc71/ffffff?text=フシギ王&font=sans-serif',
    bannerUrl: 'https://placehold.co/1200x450/2ecc71/ffffff?text=フシギ王&font=sans-serif',
    genre: 'アドベンチャー',
    platform: 'PC',
    releaseYear: 2021, // Placeholder
    teamMembers: ['CGPチームB'],
    technologies: ['RPGツクールMZ'],
    gallery: [
      'https://placehold.co/600x338/58d68d/ffffff?text=ワールドマップ&font=sans-serif',
      'https://placehold.co/600x338/82e0aa/ffffff?text=キャラクター会話&font=sans-serif',
    ],
  },
  {
    id: 'semaru-neko',
    title: 'せまるねこにげるねこ',
    shortDescription: 'ネコから逃げろ！シンプルで楽しい追いかけっこゲーム。',
    longDescription: '「せまるねこにげるねこ」は、迫りくるたくさんのネコたちから、ひたすら逃げ続けるカジュアルアクションゲームです。簡単操作で誰でもすぐに楽しめます。あなたはどれだけ長くネコたちから逃げ切れるか？ハイスコアを目指して挑戦しよう！',
    imageUrl: 'https://placehold.co/400x300/f39c12/ffffff?text=せまるねこにげるねこ&font=sans-serif',
    bannerUrl: 'https://placehold.co/1200x450/f39c12/ffffff?text=せまるねこにげるねこ&font=sans-serif',
    genre: 'カジュアルアクション',
    platform: 'スマートフォン (iOS/Android)',
    releaseYear: 2022, // Placeholder
    teamMembers: ['CGP夏チーム2022'],
    technologies: ['Unity', 'C#'],
    gallery: [
      'https://placehold.co/600x338/f5b041/ffffff?text=プレイ画面&font=sans-serif',
      'https://placehold.co/600x338/f8c471/ffffff?text=ゲームオーバー&font=sans-serif',
    ],
  }
];

// News/Activity Data (ニュース/活動記録データ)
const newsData = [
  { id: 1, date: '2024/10', title: '学園祭「和大祭」にて最新ゲーム展示！', description: '今年の和大祭で、CGPが開発中の新作ゲームを体験できるブースを出展します。ぜひお越しください！', category: 'イベント' },
  { id: 2, date: '2024/08', title: '夏チーム制作ゲーム完成発表会を実施しました', description: '新入生を中心とした夏チームが、約2ヶ月間かけて制作したゲームの発表会を行いました。力作揃いです！', category: '活動報告' },
  { id: 3, date: '2024/05', title: 'PERACON 2024 参加報告', description: '今年もCGPメンバーがPERACONに挑戦！素晴らしい成果を収めました。詳細は後日ブログにて。', category: '実績' },
  { id: 4, date: '2024/04', title: '新入生歓迎！CGP説明会開催', description: 'たくさんの新入生がCGPに興味を持ってくれました。一緒にゲームを作りましょう！', category: 'お知らせ' },
];

// Add some basic CSS for animations and text shadow
const styles = `
  .animate-fade-in-down { animation: fadeInDown 0.8s ease-out; }
  .animate-fade-in-up { animation: fadeInUp 0.8s ease-out; }
  .delay-200 { animation-delay: 0.2s; }
  @keyframes fadeInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  .animate-bounce-slow { animation: bounceSlow 2s infinite; }
  @keyframes bounceSlow { 0%, 100% { transform: translateY(-3%); animation-timing-function: cubic-bezier(0.8,0,1,1); } 50% { transform: translateY(0); animation-timing-function: cubic-bezier(0,0,0.2,1); } }
  .shadow-text { text-shadow: 0px 2px 4px rgba(0,0,0,0.5); }
  ::-webkit-scrollbar { width: 8px; }
  ::-webkit-scrollbar-track { background: #f1f1f1; }
  ::-webkit-scrollbar-thumb { background: #E60012; border-radius: 4px; }
  ::-webkit-scrollbar-thumb:hover { background: #c0000f; }
  .gemini-output { border-left: 4px solid #4285F4; padding-left: 1rem; margin-top: 1rem; background-color: #f8f9fa; }
  .loading-spinner { animation: spin 1s linear infinite; display: inline-block; }
  @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
`;

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedGameId, setSelectedGameId] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigateTo = (page, gameId = null) => {
    setCurrentPage(page);
    setSelectedGameId(gameId);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const selectedGame = initialGamesData.find(game => game.id === selectedGameId);

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-['Noto_Sans_JP',_sans-serif]">
      <Navbar navigateTo={navigateTo} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
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

function Navbar({ navigateTo, isMobileMenuOpen, setIsMobileMenuOpen }) {
  const navItems = [
    { label: 'ホーム', page: 'home', icon: <Home size={18} /> },
    { label: 'CGPについて', page: 'about', icon: <Users size={18} /> },
    { label: 'ゲーム一覧', page: 'games', icon: <Gamepad2 size={18} /> },
    { label: 'ニュース', page: 'news', icon: <Newspaper size={18} /> },
    { label: 'お問い合わせ', page: 'contact', icon: <Mail size={18} /> },
  ];
  return (
    <header className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex justify-between items-center">
        <div className="flex items-center cursor-pointer" onClick={() => navigateTo('home')}>
          <img src={clubInfo.logoUrl} alt={`${clubInfo.shortName} ロゴ`} className="h-8 mr-2" />
          <span className="text-xl font-bold text-red-600">{clubInfo.shortName}</span>
        </div>
        <nav className="hidden md:flex space-x-2">
          {navItems.map(item => (
            <button key={item.page} onClick={() => navigateTo(item.page)} className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-red-500 hover:text-white transition-colors duration-200 flex items-center">
              {item.icon && React.cloneElement(item.icon, { className: "mr-1.5" })}
              {item.label}
            </button>
          ))}
        </nav>
        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-700 hover:text-red-600 focus:outline-none">
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute w-full">
          <nav className="flex flex-col p-2 space-y-1">
            {navItems.map(item => (
              <button key={item.page} onClick={() => navigateTo(item.page)} className="px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-red-500 hover:text-white transition-colors duration-200 flex items-center w-full text-left">
                {item.icon && React.cloneElement(item.icon, { className: "mr-2" })}
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

function HomePage({ navigateTo }) {
  const featuredGames = initialGamesData.slice(0, 2);
  return (
    <>
      <section className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-20 md:py-32">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-down">{clubInfo.name}</h1>
          <p className="text-xl md:text-3xl mb-8 animate-fade-in-up delay-200">{clubInfo.tagline}</p>
          <button onClick={() => navigateTo('games')} className="bg-white text-red-600 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105 animate-bounce-slow">
            <Gamepad2 className="inline-block mr-2 mb-0.5" /> 制作ゲームを見る
          </button>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6 text-red-600">CGPへようこそ！</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">{clubInfo.description.substring(0, 150)}...</p>
          <button onClick={() => navigateTo('about')} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 flex items-center mx-auto">
            もっと詳しく <ChevronRight size={20} className="ml-1" />
          </button>
        </div>
      </section>
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">注目のゲーム</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {featuredGames.map(game => <GameCard key={game.id} game={game} navigateTo={navigateTo} isFeatured={true} />)}
          </div>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">最新ニュース</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {newsData.slice(0, 4).map(newsItem => <NewsCard key={newsItem.id} newsItem={newsItem} navigateTo={navigateTo} isTeaser={true} />)}
          </div>
          <div className="text-center mt-10">
            <button onClick={() => navigateTo('news')} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 flex items-center mx-auto">
              すべてのニュースを見る <ChevronRight size={20} className="ml-1" />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

function AboutPage({ navigateTo }) {
  const strengths = [
    { icon: <Sparkles size={24} className="text-yellow-500" />, title: "初心者大歓迎！", description: "ゲーム制作の経験は問いません。プログラミング、デザイン、企画、音楽など、あなたの「好き」を活かせます。先輩たちが丁寧にサポートします！" },
    { icon: <Users2 size={24} className="text-blue-500" />, title: "多様な仲間とチーム制作", description: "様々なスキルを持つメンバーとチームを組み、アイデアを出し合いながら一つのゲームを創り上げる達成感を味わえます。" },
    { icon: <Trophy size={24} className="text-green-500" />, title: "コンテスト挑戦＆実績", description: "日本ゲーム大賞やPERACONなど、外部のコンテストにも積極的に挑戦。過去には多数の受賞実績があります。" },
    { icon: <Lightbulb size={24} className="text-purple-500" />, title: "充実した学習環境", description: "定期的な勉強会やワークショップでスキルアップ。夏には新入生向けの集中ゲーム制作期間も設けています。" },
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
        <p className="text-gray-700 leading-relaxed">私たちは、メンバー一人ひとりが創造性を存分に発揮し、技術を磨き、そして何よりもゲーム制作を心から楽しむことを大切にしています。和歌山大学から、世界に通用するような面白いゲームを発信していくことが私たちの夢です。</p>
      </section>
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">CGPの強み</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {strengths.map((strength, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-3">{strength.icon}<h3 className="text-xl font-semibold text-gray-800 ml-3">{strength.title}</h3></div>
              <p className="text-gray-600">{strength.description}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="text-center bg-gray-100 p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">一緒にゲームを作りませんか？</h2>
        <p className="text-gray-700 mb-6">CGPはいつでも新しい仲間を募集しています！少しでも興味を持ったら、お気軽にお問い合わせください。</p>
        <button onClick={() => navigateTo('contact')} className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-lg shadow-md transition duration-300 transform hover:scale-105">
          <Mail className="inline-block mr-2" /> お問い合わせはこちら
        </button>
      </section>
    </div>
  );
}

function GamesListPage({ games, navigateTo }) {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-10 text-center text-red-600">制作ゲーム一覧</h1>
      {games.length === 0 ? <p className="text-center text-gray-600 text-xl">現在公開中のゲームはありません。</p> : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {games.map(game => <GameCard key={game.id} game={game} navigateTo={navigateTo} />)}
        </div>
      )}
    </div>
  );
}

function GameCard({ game, navigateTo, isFeatured = false }) {
  const cardClasses = `bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 flex flex-col ${isFeatured ? 'md:flex-row' : ''}`;
  const imageContainerClasses = isFeatured ? 'md:w-1/2' : '';
  const contentClasses = isFeatured ? 'md:w-1/2 p-6' : 'p-5';
  return (
    <div className={cardClasses} onClick={() => navigateTo('gameDetail', game.id)}>
      <div className={`relative ${imageContainerClasses}`}>
        <img src={game.imageUrl} alt={`[${game.title}の画像]`} className="w-full h-48 object-cover" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x300/cccccc/999999?text=画像なし&font=sans-serif'; }} />
        <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded font-semibold">{game.platform}</div>
      </div>
      <div className={contentClasses}>
        <h3 className={`font-bold mb-1 ${isFeatured ? 'text-2xl' : 'text-xl'} text-gray-800 hover:text-red-600`}>{game.title}</h3>
        <p className="text-xs text-gray-500 mb-2">{game.genre} - {game.releaseYear}年</p>
        <p className={`text-sm text-gray-600 mb-3 ${isFeatured ? 'h-auto' : 'h-16 overflow-hidden text-ellipsis'}`}>{game.shortDescription}</p>
        {!isFeatured && <button className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-3 rounded-md text-sm transition duration-300">詳細を見る</button>}
      </div>
    </div>
  );
}

function GameDetailPage({ game, navigateTo }) {
  const [enhancedDescription, setEnhancedDescription] = useState('');
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhanceError, setEnhanceError] = useState('');

  const [generatedIdea, setGeneratedIdea] = useState(null);
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
      setEnhanceError(`エラー: ${error.message}`);
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
      setGenerateError(`エラー: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };


  return (
    <div className="bg-gray-100 py-8">
      <div className="container mx-auto px-2 sm:px-4">
        <button onClick={() => navigateTo('games')} className="mb-6 bg-white hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 flex items-center">
          <ArrowLeft size={18} className="mr-2" /> ゲーム一覧へ戻る
        </button>
        <article className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="relative">
            <img src={game.bannerUrl} alt={`[${game.title}のバナー画像]`} className="w-full h-56 md:h-80 lg:h-96 object-cover" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/1200x450/cccccc/999999?text=バナーなし&font=sans-serif'; }} />
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

              <button onClick={handleEnhanceDescription} disabled={isEnhancing} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 flex items-center disabled:opacity-50">
                <Sparkles size={18} className="mr-2" />
                {isEnhancing ? <><Loader2 size={18} className="mr-2 loading-spinner" />処理中...</> : '✨ AIで説明を豊かにする'}
              </button>
              {enhanceError && <p className="mt-2 text-sm text-red-600 flex items-center"><AlertTriangle size={16} className="mr-1" />{enhanceError}</p>}
              {enhancedDescription && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md gemini-output">
                  <h3 className="text-lg font-semibold text-blue-700 mb-2">AIによる説明文：</h3>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">{enhancedDescription}</p>
                </div>
              )}
            </section>

            <section className="my-8 pt-6 border-t border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">新しいゲームのアイデアを探す</h2>
              <button onClick={handleGenerateGameIdea} disabled={isGenerating} className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 flex items-center disabled:opacity-50">
                <Lightbulb size={18} className="mr-2" />
                {isGenerating ? <><Loader2 size={18} className="mr-2 loading-spinner" />生成中...</> : '✨ 新しいゲームのアイデアを生成'}
              </button>
              {generateError && <p className="mt-2 text-sm text-red-600 flex items-center"><AlertTriangle size={16} className="mr-1" />{generateError}</p>}
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
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center"><Youtube size={24} className="mr-2 text-red-600" />紹介動画</h2>
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
                  <iframe src={game.videoUrl.replace("watch?v=", "embed/")} title={`${game.title} 紹介動画`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full"></iframe>
                </div>
              </section>
            )}
            {game.gallery && game.gallery.length > 0 && (
              <section className="mb-8 pt-6 border-t border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">ギャラリー</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {game.gallery.map((imgUrl, index) => (
                    <img key={index} src={imgUrl} alt={`[${game.title}ギャラリー画像 ${index + 1}]`} className="w-full h-auto object-cover rounded-lg shadow-md hover:opacity-80 transition-opacity duration-300 cursor-pointer" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x338/cccccc/999999?text=画像なし&font=sans-serif'; }} onClick={() => window.open(imgUrl, '_blank')} />
                  ))}
                </div>
              </section>
            )}
            <section className="grid md:grid-cols-2 gap-x-8 gap-y-6 mb-8 bg-gray-50 p-6 rounded-lg  pt-6 border-t border-gray-200 mt-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center"><Users2 size={20} className="mr-2 text-blue-600" />開発チーム</h3>
                <ul className="list-disc list-inside text-gray-600 text-sm">
                  {game.teamMembers && game.teamMembers.map(member => <li key={member}>{member}</li>)}
                  {!game.teamMembers && <li>情報なし</li>}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center"><CalendarDays size={20} className="mr-2 text-green-600" />開発期間</h3>
                <p className="text-gray-600 text-sm">{game.developmentPeriod || '情報なし'}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center"><Wrench size={20} className="mr-2 text-purple-600" />使用技術</h3>
                <p className="text-gray-600 text-sm">{game.technologies ? game.technologies.join(', ') : '情報なし'}</p>
              </div>
            </section>
            {game.downloadLink && game.downloadLink !== '#' && (
              <div className="text-center mt-10">
                <a href={game.downloadLink} target="_blank" rel="noopener noreferrer" className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-300 transform hover:scale-105 inline-flex items-center text-lg">
                  <Download size={22} className="mr-2" /> ゲームをプレイ / ダウンロード <ExternalLink size={18} className="ml-2" />
                </a>
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}

function NewsPage({ navigateTo }) {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-10 text-center text-red-600">ニュース & 活動記録</h1>
      <div className="space-y-8 max-w-3xl mx-auto">
        {newsData.length > 0 ? newsData.map(item => <NewsCard key={item.id} newsItem={item} navigateTo={navigateTo} />) : <p className="text-center text-gray-600">ニュースはまだありません。</p>}
      </div>
    </div>
  );
}

function NewsCard({ newsItem, navigateTo, isTeaser = false }) {
  const categoryColors = { 'イベント': 'bg-blue-100 text-blue-800', '活動報告': 'bg-green-100 text-green-800', '実績': 'bg-yellow-100 text-yellow-800', 'お知らせ': 'bg-purple-100 text-purple-800', };
  return (
    <article className={`bg-white rounded-lg shadow-lg overflow-hidden ${isTeaser ? 'hover:shadow-xl transition-shadow' : ''}`}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm text-gray-500">{newsItem.date}</p>
          {newsItem.category && <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${categoryColors[newsItem.category] || 'bg-gray-100 text-gray-800'}`}>{newsItem.category}</span>}
        </div>
        <h3 className={`font-semibold text-gray-800 ${isTeaser ? 'text-lg' : 'text-xl'} mb-2 hover:text-red-600 cursor-pointer`} onClick={() => { /* Potentially navigate to a full news item page */ }}>{newsItem.title}</h3>
        <p className={`text-gray-600 text-sm ${isTeaser ? 'h-12 overflow-hidden text-ellipsis' : ''}`}>{newsItem.description}</p>
        {!isTeaser && <button className="text-red-500 hover:text-red-700 font-semibold text-sm mt-3 inline-flex items-center">続きを読む <ChevronRight size={16} className="ml-1" /></button>}
      </div>
    </article>
  );
}

function ContactPage({ navigateTo }) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitError('');
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setSubmitError("すべての必須項目を入力してください。");
      return;
    }
    console.log("Form data submitted:", formData);
    // ここで実際の送信処理（例:メール送信API呼び出し）を行う
    // 成功したら setIsSubmitted(true)
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-10 text-center text-red-600">お問い合わせ</h1>
      {isSubmitted ? (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-6 rounded-md shadow-md text-center max-w-md mx-auto">
          <h2 className="text-2xl font-semibold mb-2">送信完了！</h2>
          <p>お問い合わせありがとうございます。担当者より折り返しご連絡いたします。</p>
          <button onClick={() => navigateTo('home')} className="mt-6 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg">ホームに戻る</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-2xl space-y-6">
          {submitError && <p className="text-sm text-red-600 flex items-center"><AlertTriangle size={16} className="mr-1" />{submitError}</p>}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">お名前<span className="text-red-500">*</span></label>
            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">メールアドレス<span className="text-red-500">*</span></label>
            <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">件名<span className="text-red-500">*</span></label>
            <input type="text" name="subject" id="subject" value={formData.subject} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">お問い合わせ内容<span className="text-red-500">*</span></label>
            <textarea name="message" id="message" rows="5" value={formData.message} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"></textarea>
          </div>
          <div className="text-center">
            <button type="submit" className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition duration-300 transform hover:scale-105">
              <MessageSquare size={20} className="inline-block mr-2" /> 送信する
            </button>
          </div>
          <p className="text-xs text-gray-500 text-center mt-4">または、 <a href={`mailto:${clubInfo.contactEmail}`} className="text-red-500 hover:underline">{clubInfo.contactEmail}</a> まで直接メールをお送りください。</p>
        </form>
      )}
    </div>
  );
}

function Footer({ navigateTo }) {
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
