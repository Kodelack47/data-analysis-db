// File: src/components/MockAIChat.tsx

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Bot, User, Send } from 'lucide-react';

const getMockResponse = async (question) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    const lowerQ = question.toLowerCase();
    if (lowerQ.includes('average') || lowerQ.includes('mean')) {
      return "Based on your data, the average value appears to be in the mid-range. This suggests a balanced distribution with most values clustering around the center.";
    }
    if (lowerQ.includes('trend') || lowerQ.includes('pattern')) {
      return "I can see an interesting upward trend in your data! There appears to be consistent growth in the later periods, which could indicate improving performance or seasonal effects.";
    }
    if (lowerQ.includes('highest') || lowerQ.includes('maximum') || lowerQ.includes('peak')) {
      return "The highest value in your dataset represents a peak performance period. This could indicate optimal conditions or a particularly successful time period worth studying further.";
    }
    if (lowerQ.includes('lowest') || lowerQ.includes('minimum')) {
      return "The minimum value might represent a challenging period or starting point. Understanding what caused this low point could provide valuable insights for improvement.";
    }
    if (lowerQ.includes('why') || lowerQ.includes('reason')) {
      return "While I can see the patterns in your numbers, determining the 'why' requires domain knowledge. Consider external factors like seasonality, market conditions, or operational changes during those periods.";
    }
    return "That's an interesting question about your data! The patterns I see suggest there are more layers to explore.";
};

const MockAIChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { type: 'user', content: input };
    setMessages(prev => [...prev, userMessage]); 
    setInput('');
    setLoading(true);

    try {
      const aiReplyContent = await getMockResponse(input);
      const aiMessage = { type: 'ai', content: aiReplyContent };
      setMessages(prev => [...prev, aiMessage]); 
    } catch (error) {
      console.error("Error fetching mock AI response:", error);
      const errorMessage = { type: 'ai', content: 'Sorry, I encountered an error.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Bot className="h-5 w-5 text-blue-600" />
          AI Data Assistant (Mock)
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Message List Area */}
        <div className="h-64 overflow-y-auto mb-4 p-3 border rounded-lg bg-gray-50 space-y-3">
          {messages.length === 0 && (
            <p className="text-center text-gray-500 mt-8">
              <MessageCircle className="mx-auto h-8 w-8 mb-2" />
              Ask me about your data (e.g., 'average', 'trend', 'highest').
            </p>
          )}
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex items-start ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <Badge 
                variant={msg.type === 'user' ? 'default' : 'secondary'} 
                className={`max-w-xs p-3 rounded-lg text-left ${msg.type === 'user' ? 'bg-blue-500 text-white' : 'bg-white border text-gray-800'}`}
              >
                {msg.type === 'ai' && <Bot className="inline h-4 w-4 mr-2" />}
                {msg.type === 'user' && <User className="inline h-4 w-4 mr-2" />}
                {msg.content}
              </Badge>
            </div>
          ))}
          {loading && (
            <div className="flex items-center justify-start mt-2">
                <Badge variant="secondary" className="p-3 bg-white border">
                    <Bot className="inline h-4 w-4 mr-2 animate-pulse" />
                    AI is thinking...
                </Badge>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
            placeholder="Type your question..."
            disabled={loading}
            className="flex-1"
          />
          <Button onClick={handleSend} disabled={loading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MockAIChat;
