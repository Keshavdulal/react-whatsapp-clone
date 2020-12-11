import React,{useState} from 'react';
import { Tab, Nav, Button, Modal } from "react-bootstrap";
import Conversations from "./Conversations";
import Contacts from "./Contacts";
import NewContactModal from "./NewContactModal";
import NewConversationModal from "./NewConversationModal";


const Sidebar = ({ id }) => {
  const CONVERSATION_KEY = "conversations"
  const CONTACT_KEY = "contacts"
  
  const [activeKey, setActiveKey] = useState(CONVERSATION_KEY)
  const [modalOpen, setModalOpen] = useState(false)
  const conversationsOpen = (activeKey === CONVERSATION_KEY)

  const closeModal = () => setModalOpen(false)
  
  return (
    <div
      className="d-flex flex-column"
      style={{ width: '250px' }}>
      
      <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
        <Nav variant="tabs" className="justify-content-center">
          <Nav.Item>
            <Nav.Link eventKey={CONVERSATION_KEY} >Conversation</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={CONTACT_KEY} >Contacts</Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content className="border-right overflow-auto flex-grow-1">
          <Tab.Pane eventKey={CONVERSATION_KEY}>
            <Conversations/>
          </Tab.Pane>
          <Tab.Pane eventKey={CONTACT_KEY}>
            <Contacts/>
          </Tab.Pane>
        </Tab.Content>

        <div className="p-2 border-top border-right small">
        Your Id is <span className="text-muted">{id}</span>
        </div>

        <Button
          onClick={()=> setModalOpen(true)}
          className="rounded-0">New {conversationsOpen ? "Conversation" : "Contact"}</Button>
      </Tab.Container>
      
      <Modal show={modalOpen} hide={closeModal}>
        {conversationsOpen
          ? <NewConversationModal closeModal={closeModal}/>
          : <NewContactModal closeModal={closeModal}/>}
      </Modal>
    </div>
  );
}

export default Sidebar;