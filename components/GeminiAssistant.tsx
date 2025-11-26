import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

interface Message {
  role: 'user' | 'model';
  text: string;
}

const GeminiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Sawasdee krub! I am your AI guide for Bangkok. Ask me anything!' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !process.env.API_KEY) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      // Using gemini-2.5-flash for speed on mobile
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
            {
                role: 'user',
                parts: [{ text: `You are a helpful travel guide for a tourist in Bangkok. Keep answers short, practical, and friendly. Current context: User is on a 6-day trip. Question: ${userMsg}` }]
            }
        ],
      });

      const text = response.text || "Sorry, I couldn't understand that.";
      setMessages(prev => [...prev, { role: 'model', text }]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Sawadee! I'm having trouble connecting to the spirits (API Error). Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  if (!process.env.API_KEY) return null; // Hide if no key configured

  return (
    <>
      {/* Floating Action Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-6 bg-teal-600 text-white p-3 rounded-full shadow-lg z-40 hover:bg-teal-700 transition-transform active:scale-95"
        aria-label="Ask AI"
      >
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-28 sm:right-6 z-50 flex flex-col pointer-events-none">
           <div className="pointer-events-auto bg-white sm:w-80 w-full h-full sm:h-96 shadow-2xl rounded-none sm:rounded-2xl flex flex-col border border-teal-100 overflow-hidden animate-fade-in-up">
              {/* Header */}
              <div className="bg-teal-600 text-white p-3 flex justify-between items-center">
                  <h3 className="font-bold flex items-center gap-2">
                     <span>🐘</span> AI Guide
                  </h3>
                  <button onClick={() => setIsOpen(false)} className="text-teal-100 hover:text-white">✕</button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-teal-50">
                  {messages.map((m, i) => (
                      <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[85%] rounded-lg p-2 text-sm ${
                              m.role === 'user' 
                              ? 'bg-teal-600 text-white rounded-br-none' 
                              : 'bg-white text-gray-800 shadow-sm border border-teal-100 rounded-bl-none'
                          }`}>
                              {m.text}
                          </div>
                      </div>
                  ))}
                  {loading && <div className="text-xs text-gray-500 animate-pulse ml-2">Thinking...</div>}
                  <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-3 bg-white border-t border-teal-100 flex gap-2">
                  <input 
                    type="text" 
                    className="flex-1 border border-gray-300 rounded-full px-3 py-1 text-sm focus:outline-none focus:border-teal-500"
                    placeholder="Ask about food, transport..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                  />
                  <button 
                    onClick={handleSend}
                    disabled={loading}
                    className="bg-teal-600 text-white rounded-full p-2 hover:bg-teal-700 disabled:opacity-50"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
              </div>
           </div>
        </div>
      )}
    </>
  );
};

export default GeminiAssistant;
