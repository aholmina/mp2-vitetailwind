// File: src/components/GeminiAI.jsx

import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader, User, Bot, Search } from 'lucide-react';

const GeminiAI = () => {
  const [input, setInput] = useState('');
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const chatContainerRef = useRef(null);

  const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const geminiApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`;

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [conversation]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setConversation(prev => [...prev, { type: 'user', content: input }]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(geminiApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: input + " (Please provide your response in bullet points)"
                }
              ]
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response from Gemini AI');
      }

      const data = await response.json();
      const aiResponse = data.candidates[0].content.parts[0].text;
      setConversation(prev => [...prev, { type: 'ai', content: aiResponse }]);
      setInput('');
    } catch (error) {
      setError('An error occurred while fetching the response. Please try again.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderBulletPoints = (text) => {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    const isBulletList = lines.every(line => line.trim().startsWith('-') || line.trim().startsWith('•'));
    
    if (isBulletList) {
      return (
        <ul className="list-disc pl-5 space-y-2">
          {lines.map((line, index) => (
            <li key={index} className="transition-all duration-300 hover:translate-x-1">
              {line.replace(/^[-•]\s*/, '')}
            </li>
          ))}
        </ul>
      );
    } else {
      return (
        <ul className="list-disc pl-5 space-y-2">
          {lines.map((line, index) => (
            <li key={index} className="transition-all duration-300 hover:translate-x-1">{line}</li>
          ))}
        </ul>
      );
    }
  };

  return (
    <section className="py-8 bg-gradient-to-br from-gray-900 via-pink-500 to-gray-800 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-8 text-center text-sky-400 italic">Gemini AI Assistant</h2>
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex rounded-lg overflow-hidden">
            <input
              type="text"
              className="flex-grow py-2 px-4 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Gemini AI something..."
              disabled={isLoading}
            />
            <button 
              type="submit" 
              className="bg-pink-500 text-white px-4 py-2 hover:bg-pink-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? <Loader className="animate-spin" size={24} /> : <Search size={24} />}
            </button>
          </div>
        </form>

        {error && <div className="bg-red-500 text-white px-4 py-3 rounded-lg mb-4" role="alert">{error}</div>}

        <div 
          className="bg-gray-800 rounded-lg p-6 shadow-lg overflow-y-auto max-h-[60vh]"
          ref={chatContainerRef}
        >
          {conversation.map((message, index) => (
            <div key={index} className={`flex mb-4 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-start ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className="flex-shrink-0 mr-2">
                  {message.type === 'user' ? 
                    <User size={24} className="text-blue-400" /> : 
                    <Bot size={24} className="text-green-400" />
                  }
                </div>
                <div className={`rounded-lg p-3 max-w-xs lg:max-w-md ${
                  message.type === 'user' ? 'bg-blue-500' : 'bg-gray-700'
                }`}>
                  {message.type === 'user' ? (
                    <p>{message.content}</p>
                  ) : (
                    renderBulletPoints(message.content)
                  )}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-2">
                  <Bot size={24} className="text-green-400" />
                </div>
                <div className="rounded-lg p-3 bg-gray-700">
                  <Loader className="animate-spin" size={24} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default GeminiAI;