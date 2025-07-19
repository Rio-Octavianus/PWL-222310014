
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Send, Menu } from "lucide-react";
import { useState } from "react";
import { Message, Contact } from "@/types";

interface ChatAreaProps {
  selectedContact: Contact | null;
  messages: Message[];
  onSendMessage: (text: string) => void;
  onShowContacts?: () => void;
}

const ChatArea = ({ selectedContact, messages, onSendMessage, onShowContacts }: ChatAreaProps) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage.trim());
      setNewMessage('');
    }
  };

  const getSentimentBadge = (sentiment: string) => {
    const colors = {
      positive: 'bg-green-100 text-green-800',
      negative: 'bg-red-100 text-red-800',
      neutral: 'bg-gray-100 text-gray-800'
    };
    
    return (
      <Badge className={`${colors[sentiment as keyof typeof colors]} text-xs ml-2`}>
        {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
      </Badge>
    );
  };

  if (!selectedContact) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100 p-4">
        {/* Mobile menu button */}
        {onShowContacts && (
          <Button
            variant="outline"
            size="sm"
            onClick={onShowContacts}
            className="absolute top-4 left-4 md:hidden"
          >
            <Menu className="h-4 w-4" />
          </Button>
        )}
        
        <div className="text-center max-w-sm">
          <h2 className="text-xl md:text-2xl font-semibold text-muted-foreground mb-2">
            Select a conversation
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Choose a contact to start chatting
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100 relative h-full">
      {/* Background decorative elements - hidden on small screens */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-br from-orange-200/30 to-yellow-200/30 rounded-full blur-xl"></div>
      </div>

      {/* Chat Header */}
      <div className="bg-background/80 backdrop-blur-sm border-b border-border p-3 md:p-4 relative z-10">
        <div className="flex items-center space-x-3">
          {/* Mobile menu button */}
          {onShowContacts && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onShowContacts}
              className="md:hidden p-2"
            >
              <Menu className="h-4 w-4" />
            </Button>
          )}
          
          <div className="relative">
            <Avatar className="h-8 w-8 md:h-10 md:w-10">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs md:text-sm">
                {selectedContact.avatar}
              </AvatarFallback>
            </Avatar>
            {selectedContact.status === 'online' && (
              <div className="absolute -bottom-0.5 -right-0.5 md:-bottom-1 md:-right-1 w-2.5 h-2.5 md:w-3 md:h-3 bg-green-500 rounded-full border-2 border-background"></div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-semibold text-sm md:text-base truncate">{selectedContact.name}</h2>
            <p className="text-xs md:text-sm text-green-600 capitalize">{selectedContact.status}</p>
          </div>
        </div>
      </div>

      {/* Abuse Detection Notice */}
      <div className="bg-background/80 backdrop-blur-sm border-b border-border p-2 md:p-3 text-center relative z-10">
        <p className="text-xs md:text-sm text-muted-foreground">
          This conversation uses sentences checking for detection of verbal abuse.
        </p>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4 relative z-10">
        <div className="text-center">
          <span className="bg-background/80 backdrop-blur-sm px-2 md:px-3 py-1 rounded-full text-xs md:text-sm text-muted-foreground">
            Today
          </span>
        </div>

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <Card className={`max-w-[85%] sm:max-w-xs md:max-w-sm p-2 md:p-3 ${
              message.sender === 'user' 
                ? 'bg-background/90 backdrop-blur-sm ml-4 md:ml-12' 
                : 'bg-background/80 backdrop-blur-sm mr-4 md:mr-12'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                <p className="text-xs md:text-sm break-words">{message.text}</p>
                <div className="flex-shrink-0">
                  {getSentimentBadge(message.sentiment)}
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* Sentiment Status */}
      <div className="bg-background/80 backdrop-blur-sm border-t border-border p-2 md:p-3 relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs md:text-sm">
          <span className="font-medium">Sentimental status:</span>
          <div className="flex items-center space-x-3 md:space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs md:text-sm">Positive</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-gray-500 rounded-full"></div>
              <span className="text-xs md:text-sm">Neutral</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full"></div>
              <span className="text-xs md:text-sm">Negative</span>
            </div>
          </div>
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-background/80 backdrop-blur-sm border-t border-border p-3 md:p-4 relative z-10">
        <div className="flex items-center space-x-2 md:space-x-3">
          <Button variant="outline" size="icon" className="h-8 w-8 md:h-10 md:w-10 flex-shrink-0">
            <Plus className="h-3 w-3 md:h-4 md:w-4" />
          </Button>
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Type a message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="w-full px-3 py-2 md:px-4 md:py-2 bg-background rounded-full border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm md:text-base"
            />
          </div>
          <Button onClick={handleSendMessage} size="icon" className="h-8 w-8 md:h-10 md:w-10 flex-shrink-0">
            <Send className="h-3 w-3 md:h-4 md:w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
