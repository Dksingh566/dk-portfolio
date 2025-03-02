
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, Send, X } from 'lucide-react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const AI_API_KEY = ""; // You should add your API key here after I provide the code

export function AIChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      role: 'user',
      content: input
    };
    
    setMessages([...messages, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Replace with your actual API endpoint
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${AI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [...messages, userMessage].map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          temperature: 0.7,
          max_tokens: 500
        })
      });
      
      const data = await response.json();
      
      if (data.choices && data.choices[0]) {
        const botMessage: Message = {
          role: 'assistant',
          content: data.choices[0].message.content
        };
        setMessages(prevMessages => [...prevMessages, botMessage]);
      } else {
        throw new Error('Invalid response from API');
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: "I'm sorry, I couldn't process your request. Please try again later."
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating chat button */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button 
            className="fixed bottom-6 right-6 rounded-full shadow-lg h-14 w-14 p-0 z-50 bg-primary hover:bg-primary/90"
            onClick={() => setIsOpen(true)}
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        
        <DialogContent className="sm:max-w-[400px] max-h-[600px] flex flex-col p-0 gap-0 border-2 border-primary/20">
          {/* Chat header */}
          <div className="p-4 bg-primary text-primary-foreground flex justify-between items-center border-b">
            <h3 className="font-semibold">AI Assistant</h3>
            <Button 
              variant="ghost" 
              size="icon"
              className="text-primary-foreground hover:text-primary-foreground/80 hover:bg-primary/80"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[300px]">
            {messages.length === 0 ? (
              <div className="text-center text-muted-foreground p-4">
                Ask me anything about my skills, projects, or how I can help you!
              </div>
            ) : (
              messages.map((message, index) => (
                <Card 
                  key={index} 
                  className={`p-3 max-w-[85%] ${
                    message.role === 'user' 
                      ? 'bg-primary/10 ml-auto' 
                      : 'bg-muted mr-auto'
                  }`}
                >
                  {message.content}
                </Card>
              ))
            )}
            {isLoading && (
              <Card className="p-3 max-w-[85%] bg-muted mr-auto">
                <div className="flex space-x-2">
                  <div className="animate-bounce h-2 w-2 bg-primary rounded-full"></div>
                  <div className="animate-bounce h-2 w-2 bg-primary rounded-full" style={{ animationDelay: '0.2s' }}></div>
                  <div className="animate-bounce h-2 w-2 bg-primary rounded-full" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </Card>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input area */}
          <div className="p-3 border-t flex gap-2">
            <Textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="min-h-[50px] resize-none"
            />
            <Button 
              onClick={handleSendMessage}
              disabled={isLoading || !input.trim()}
              className="h-[50px] aspect-square p-2"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AIChat;
