
import { useState } from 'react';
import ContactList from '@/components/ContactList';
import ChatArea from '@/components/ChatArea';
import { mockContacts, mockMessagesByContact } from '@/data/mockData';
import { analyzeSentiment } from '@/utils/sentimentAnalysis';
import { Message } from '@/types';

const Index = () => {
  const [selectedContactId, setSelectedContactId] = useState<string | null>('1');
  const [messagesByContact, setMessagesByContact] = useState<Record<string, Message[]>>(mockMessagesByContact);
  const [showContactList, setShowContactList] = useState(false);

  const selectedContact = mockContacts.find(contact => contact.id === selectedContactId) || null;
  const currentMessages = selectedContactId ? messagesByContact[selectedContactId] || [] : [];

  const handleSendMessage = (text: string) => {
    if (!selectedContactId) return;

    const sentimentResult = analyzeSentiment(text);
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
      sentiment: sentimentResult.sentiment
    };

    setMessagesByContact(prev => ({
      ...prev,
      [selectedContactId]: [...(prev[selectedContactId] || []), newMessage]
    }));

    setTimeout(() => {
      const responses = [
        'That sounds great!',
        'I understand',
        'Tell me more about that',
        'Interesting perspective',
        'I see what you mean'
      ];
      
      const responseText = responses[Math.floor(Math.random() * responses.length)];
      const responseSentiment = analyzeSentiment(responseText);
      
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'contact',
        timestamp: new Date(),
        sentiment: responseSentiment.sentiment
      };

      setMessagesByContact(prev => ({
        ...prev,
        [selectedContactId]: [...(prev[selectedContactId] || []), responseMessage]
      }));
    }, 1000);
  };

  const handleSelectContact = (contactId: string) => {
    setSelectedContactId(contactId);
    setShowContactList(false); // Close contact list on mobile after selection
  };

  return (
    <div className="h-screen flex bg-background relative">
      {/* Mobile overlay for contact list */}
      {showContactList && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={() => setShowContactList(false)}
        />
      )}
      
      {/* Contact List - Hidden on mobile by default, shown as overlay when needed */}
      <div className={`
        ${showContactList ? 'translate-x-0' : '-translate-x-full'}
        fixed left-0 top-0 z-50 w-80 h-full transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 md:block md:z-auto
      `}>
        <ContactList
          contacts={mockContacts}
          selectedContact={selectedContactId}
          onSelectContact={handleSelectContact}
          onClose={() => setShowContactList(false)}
        />
      </div>
      
      {/* Chat Area */}
      <div className="flex-1 w-full md:w-auto">
        <ChatArea
          selectedContact={selectedContact}
          messages={currentMessages}
          onSendMessage={handleSendMessage}
          onShowContacts={() => setShowContactList(true)}
        />
      </div>
    </div>
  );
};

export default Index;
