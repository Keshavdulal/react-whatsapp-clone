import {v4 as uuid} from 'uuid'
import React,{useRef} from 'react'
import { Button, Container, Form } from "react-bootstrap"

function Login({onIdSubmit}) {
  
  const idRef = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    onIdSubmit(idRef.current.value)
  }

  const createNewId = () => {
    // const newID = uuid();
    onIdSubmit(uuid())
  }

  return (
    <Container className="align-items-center d-flex" style={{height:"100vh"}}>
      <Form onSubmit={handleSubmit} className="w-100">
        <Form.Group>
          <Form.Label>Enter your ID</Form.Label>
          <Form.Control type="text" ref={idRef} required />
        </Form.Group>
        <Button type="submit" className="mr-2">Login</Button>
        <Button variant="secondary" onClick={createNewId}>Create an ID</Button>
      </Form>
    </Container>
  )
}

export default Login; 