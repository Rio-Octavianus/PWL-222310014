
export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'contact';
  timestamp: Date;
  sentiment: 'positive' | 'negative' | 'neutral';
}

export interface Contact {
  id: string;
  name: string;
  status: 'online' | 'offline';
  avatar: string;
  lastMessage?: string;
  isFavorite?: boolean;
}
