// File: src/components/MockAIChat.tsx - Updated with Week 8 Patterns

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Bot, User, Send } from 'lucide-react';
import SkeletonLoader from './SkeletonLoader'; // <-- NEW IMPORT

const getMockResponse = async (question) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    // ... (rest of the getMockResponse function) ...
    return "That's an interesting question about your data! The patterns I see suggest there are more layers to explore.";
};

const MockAIChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    // ... (rest of handleSend function) ...
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
          {/* ... (rest of messages map) ... */}
          {loading && (
            <div className="mt-2">
                {/* 🆕 WEEK 8: Use the Skeleton Loader while loading */}
                <SkeletonLoader /> 
            </div>
          )}
        </div>

        {/* Input Area (Accessibility improvements added here) */}
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
            placeholder="Type your question..."
            disabled={loading}
            className="flex-1"
            aria-label="Chat input field" // <-- NEW ARIA LABEL
          />
          <Button 
            onClick={handleSend} 
            disabled={loading || !input.trim()}
            aria-label="Send message" // <-- NEW ARIA LABEL
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MockAIChat;
