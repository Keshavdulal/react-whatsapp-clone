import React from 'react';
import { ListGroup } from "react-bootstrap";

import { useConversations } from '../context/ConversationProvider';
  
const Conversations = () => {
  const { conversations,setSelectedConvoIndex } = useConversations()
  
  return (
    <ListGroup variant="flush">
      {conversations.map((convo,index) => (
        <ListGroup.Item key={index}
          action
          active={convo.selected}
          onClick={()=>setSelectedConvoIndex(index)}
        >
          {convo.recipients.map(r=>r.name).join(', ')}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default Conversations;