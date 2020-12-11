import React from 'react';

import Login from "./Login";
import useLocalStorage from '../hooks/useLocalStorage';
import Dashboard from "./Dashboard";
import {ContactsProvider} from "../context/ContactsProvider"
import { ConversationProvider } from '../context/ConversationProvider';

function App() {
  const [id, setId] = useLocalStorage("id")

  const dashboard = (
    <ContactsProvider>
      <ConversationProvider>
        <Dashboard id={id}/>
      </ConversationProvider>
    </ContactsProvider>
  )
  
  return (
    id ? dashboard : <Login onIdSubmit={setId}/>
    )
}

export default App;
