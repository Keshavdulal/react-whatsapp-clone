import React, { useContext, useState } from 'react';
import  useLocalStorage from "../hooks/useLocalStorage";
import { useContacts } from './ContactsProvider';

const ConversationsContext = React.createContext()

// custom Context creation
export function useConversations() {
  return useContext(ConversationsContext)
}

export function ConversationProvider({ children }) {
  const [selectedConvoIndex, setSelectedConvoIndex] = useState(0)
  const [conversations, setConversations] = useLocalStorage('conversations', [])
  const { contacts } = useContacts()
  
  const createConversation = (recipients) => {
    setConversations(prevConversations => [...prevConversations, {recipients,messages:[]}])
  }

  // export formatted conversations with not just ids but with ids & names
  const formattedConversations = conversations.map((convo,index) => {
    const recipients = convo.recipients.map(recipient => {
      const contact = contacts.find(contact => contact.id === recipient)
      const name = (contact && contact.name) || recipient
      
      return { id: recipient, name }
    })
    const selected = index === selectedConvoIndex // boolean

    return {...conversations, recipients, selected}
  })

  const value = {
    conversations: formattedConversations,
    createConversation,
    setSelectedConvoIndex, //active convo index
    selectedConvo: formattedConversations[selectedConvoIndex] //active convo
  }
  
  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
}