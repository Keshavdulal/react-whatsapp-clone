import React,{useState} from 'react';
import { Modal, Form, Button } from "react-bootstrap";
import { useContacts } from "../context/ContactsProvider";
import { useConversations } from '../context/ConversationProvider'

function NewConversationModal({closeModal}) {
  const [selectedContactIds, setSelectedContactIds] = useState([])

  // using methods or variables exposed (exported) using context APIs
  const { contacts } = useContacts()
  const { createConversation } = useConversations()



  const handleSubmit = (e) => {
    console.log('new message submit pressed')
    e.preventDefault()
    
    // do something here
    createConversation(selectedContactIds)

    closeModal()
  }

  const handleCheckboxChange = (contactID) => {
    // then remove the id
    setSelectedContactIds(prevState => (
      (selectedContactIds.includes(contactID))
      ? selectedContactIds.filter(item => item !== contactID)
      : [...selectedContactIds, contactID])
    )
  }

  return (
    <>
      <Modal.Header closeButton>
        Create a new conversation
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contacts.map(contact => (
            <Form.Group controlId={contact.id} key={contact.id}>
              <Form.Check
                type="checkbox"
                value={selectedContactIds.includes(contact.id)}
                label={contact.name}
                onChange={()=>handleCheckboxChange(contact.id)}
              />

            </Form.Group>
          ))}

          <Button type="submit">Create</Button>
        </Form>
      </Modal.Body>
    </>
  );
}

export default NewConversationModal;