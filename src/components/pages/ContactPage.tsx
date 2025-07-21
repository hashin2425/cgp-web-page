import React, { useState } from 'react';
import { AlertTriangle, MessageSquare } from 'lucide-react';
import { clubInfo } from '@/data/clubInfo';

interface ContactPageProps {
    navigateTo: (page: string, gameId?: string | null) => void;
}

export default function ContactPage({ navigateTo }: ContactPageProps) {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
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
                    <button
                        onClick={() => navigateTo('home')}
                        className="mt-6 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg"
                    >
                        ホームに戻る
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-2xl space-y-6">
                    {submitError && (
                        <p className="text-sm text-red-600 flex items-center">
                            <AlertTriangle size={16} className="mr-1" />
                            {submitError}
                        </p>
                    )}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            お名前<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            メールアドレス<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                            件名<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="subject"
                            id="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                            お問い合わせ内容<span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="message"
                            id="message"
                            rows={5}
                            value={formData.message}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                        ></textarea>
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
                        >
                            <MessageSquare size={20} className="inline-block mr-2" /> 送信する
                        </button>
                    </div>
                    <p className="text-xs text-gray-500 text-center mt-4">
                        または、
                        <a href={`mailto:${clubInfo.contactEmail}`} className="text-red-500 hover:underline">
                            {clubInfo.contactEmail}
                        </a>
                        まで直接メールをお送りください。
                    </p>
                </form>
            )}
        </div>
    );
}
