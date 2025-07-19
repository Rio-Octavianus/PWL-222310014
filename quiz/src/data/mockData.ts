
import { Message, Contact } from '@/types';

export const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'Hu tao',
    status: 'online',
    avatar: 'HT',
    isFavorite: true
  },
  {
    id: '2',
    name: 'Castorice',
    status: 'online',
    avatar: 'CS',
    isFavorite: true
  },
  {
    id: '3',
    name: 'Sarla Syakira Thalib',
    status: 'offline',
    avatar: 'SS',
    lastMessage: 'kit heart gua diotak... ❤️❤️❤️'
  },
  {
    id: '4',
    name: 'Rizky Fadhil',
    status: 'offline',
    avatar: 'RF',
    lastMessage: 'Udahan'
  }
];

// Pesan per kontak - setiap kontak memiliki percakapan terpisah
export const mockMessagesByContact: Record<string, Message[]> = {
  '1': [
    {
      id: '1',
      text: 'Hey wanna date ?',
      sender: 'contact',
      timestamp: new Date(),
      sentiment: 'positive'
    },
    {
      id: '2',
      text: 'Hell yeah , lets go',
      sender: 'user',
      timestamp: new Date(),
      sentiment: 'positive'
    },
    {
      id: '3',
      text: 'Okey , see you tonight',
      sender: 'contact',
      timestamp: new Date(),
      sentiment: 'positive'
    }
  ],
  '2': [
    {
      id: '4',
      text: 'Hi there!',
      sender: 'contact',
      timestamp: new Date(),
      sentiment: 'positive'
    }
  ],
  '3': [
    {
      id: '5',
      text: 'kit heart gua diotak... ❤️❤️❤️',
      sender: 'contact',
      timestamp: new Date(),
      sentiment: 'positive'
    }
  ],
  '4': [
    {
      id: '6',
      text: 'Udahan',
      sender: 'contact',
      timestamp: new Date(),
      sentiment: 'neutral'
    }
  ]
};
