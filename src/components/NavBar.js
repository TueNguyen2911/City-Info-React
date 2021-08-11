import React from 'react'
import { NavItem, Navbar, NavLink, Container, Nav, NavDropdown,  } from 'react-bootstrap'
import { BrowserRouter as Router, Link } from 'react-router-dom'
const NavBar = () => {
    return (
        <nav className="NavBar">
            <Navbar bg="light" expand="lg">
            <Container style={{marginLeft: "10px"}}>
                <Navbar.Brand as={Link} to="/home">CityInfo</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav variant="tabs" defaultActiveKey="/home" className="me-auto">
                    <NavItem>
                        <Nav.Link  as={Link} href="/home" to="/home">Home</Nav.Link>
                    </NavItem>
                    <NavItem>
                        <Nav.Link as={Link} href="/visited" to="/visited">Visited Cities</Nav.Link>
                    </NavItem>
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        </nav>
    )
}

export default NavBar
