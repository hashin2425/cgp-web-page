// グローバルスタイル定数
export const globalStyles = `
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
