import React from 'react'
import { Navbar, Container, Nav, NavDropdown,  } from 'react-bootstrap'
import { BrowserRouter as Router, Link } from 'react-router-dom'
const NavBar = () => {
    return (
        <nav className="NavBar">
            <Navbar bg="light" expand="lg">
            <Container style={{marginLeft: "10px"}}>
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Item>
                        <Link to="/">Home</Link>
                    </Nav.Item>
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item><Link to="/visited">Visited</Link></NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        </nav>
    )
}

export default NavBar
