import React, { useContext } from 'react';
import  useLocalStorage from "../hooks/useLocalStorage";
import { useContacts } from './ContactsProvider';

const ConversationsContext = React.createContext()

// custom Context creation
export function useConversations() {
  return useContext(ConversationsContext)
}

export function ConversationProvider({ children }) {
  const [conversations, setConversations] = useLocalStorage('conversations', [])
  const { contacts } = useContacts()
  
  const createConversation = (recipients) => {
    setConversations(prevConversations => [...prevConversations, {recipients,messages:[]}])
  }

  // export formatted conversations with not just ids but with ids & names
  const formattedConversations = conversations.map(convo => {
    console.log('*',convo)
    const recipients = convo.recipients.map(recipient => {
      const contact = contacts.find(contact => contact.id === recipient)
      const name = (contact && contact.name) || recipient
      
      return { id: recipient, name }
    })

    return {...conversations, recipients}
  })

  const value = {
    conversations: formattedConversations,
    createConversation
  }
  
  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
}