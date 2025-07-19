
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import { Contact } from "@/types";

interface ContactListProps {
  contacts: Contact[];
  selectedContact: string | null;
  onSelectContact: (contactId: string) => void;
  onClose?: () => void;
}

const ContactList = ({ contacts, selectedContact, onSelectContact, onClose }: ContactListProps) => {
  const favorites = contacts.filter(contact => contact.isFavorite);
  const otherContacts = contacts.filter(contact => !contact.isFavorite);

  return (
    <div className="w-full h-full bg-background border-r border-border flex flex-col">
      {/* Header with close button for mobile */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h2 className="text-lg font-semibold md:hidden">Contacts</h2>
        {onClose && (
          <button 
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-full md:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Search Bar */}
      <div className="p-3 md:p-4 border-b border-border">
        <div className="relative">
          <input
            type="text"
            placeholder="Search or start a new chat"
            className="w-full px-3 py-2 md:px-4 md:py-2 bg-muted rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Contacts List */}
      <div className="flex-1 overflow-y-auto">
        {/* Favorites Section */}
        <div className="p-3 md:p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-muted-foreground">Favorites 🌟</h3>
            <button className="text-xs text-primary hidden md:block">Edit Favorites</button>
          </div>
          
          <div className="space-y-1 md:space-y-2">
            {favorites.map((contact) => (
              <Card
                key={contact.id}
                className={`p-2 md:p-3 cursor-pointer transition-colors hover:bg-accent ${
                  selectedContact === contact.id ? 'bg-accent' : ''
                }`}
                onClick={() => onSelectContact(contact.id)}
              >
                <div className="flex items-center space-x-2 md:space-x-3">
                  <div className="relative">
                    <Avatar className="h-8 w-8 md:h-10 md:w-10">
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs md:text-sm">
                        {contact.avatar}
                      </AvatarFallback>
                    </Avatar>
                    {contact.status === 'online' && (
                      <div className="absolute -bottom-0.5 -right-0.5 md:-bottom-1 md:-right-1 w-2.5 h-2.5 md:w-3 md:h-3 bg-green-500 rounded-full border-2 border-background"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{contact.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{contact.status}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Your Contacts Section */}
        <div className="p-3 md:p-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Your Contact</h3>
          <div className="space-y-1 md:space-y-2">
            {otherContacts.map((contact) => (
              <Card
                key={contact.id}
                className={`p-2 md:p-3 cursor-pointer transition-colors hover:bg-accent ${
                  selectedContact === contact.id ? 'bg-accent' : ''
                }`}
                onClick={() => onSelectContact(contact.id)}
              >
                <div className="flex items-center space-x-2 md:space-x-3">
                  <div className="relative">
                    <Avatar className="h-8 w-8 md:h-10 md:w-10">
                      <AvatarFallback className="bg-secondary text-secondary-foreground text-xs md:text-sm">
                        {contact.avatar}
                      </AvatarFallback>
                    </Avatar>
                    {contact.status === 'online' && (
                      <div className="absolute -bottom-0.5 -right-0.5 md:-bottom-1 md:-right-1 w-2.5 h-2.5 md:w-3 md:h-3 bg-green-500 rounded-full border-2 border-background"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{contact.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{contact.lastMessage}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Groups Section */}
        <div className="p-3 md:p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">Groups</h3>
            <button className="text-xs text-primary hidden md:block">Hide</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactList;
