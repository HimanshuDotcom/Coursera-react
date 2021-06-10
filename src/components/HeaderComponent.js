import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Button  } from 'reactstrap';
import { NavLink } from 'react-router-dom';
class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isModalOpen: false
        }
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    toggleNav() {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleLogin(e) {
        e.preventDefault();

        this.toggleModal();
        alert(`You are now Logged in ${this.username.value}`);
    }
    render() {
        return (
            <>
                <Navbar dark >
                    <NavbarBrand className = "mr-auto" href="/">
                        <img src = "assets/images/logo.png" height="30" width="41" alt = "Rsitornate Con Fusion" />
                    </NavbarBrand>
                    <NavbarToggler onClick = {this.toggleNav} />
                    <Collapse isOpen = {this.state.isOpen} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink className="nav-link" to = "/home">
                                    <span className="fa fa-home fa-lg"></span> Home
                                </NavLink>
                                <NavLink className="nav-link" to = "/aboutus">
                                    <span className="fa fa-info fa-lg"></span> About us
                                </NavLink>
                                <NavLink className="nav-link" to = "/menu">
                                    <span className="fa fa-list fa-lg"></span> Menu
                                </NavLink>
                                <NavLink className="nav-link" to = "/contactus">
                                    <span className="fa fa-address-card fa-lg"></span> Contact us
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <button className = "btn btn-outline-secondary" style = {{outline: 'none'}} onClick = {this.toggleModal}>
                            <span className = "fa fa-lg fa-sign-in"></span> Log in</button>
                    </Collapse>
                </Navbar>
                <Jumbotron>
                    <Modal isOpen = {this.state.isModalOpen} toggle = {this.toggleModal}>
                        <ModalHeader>Login</ModalHeader>
                        <ModalBody>
                            <Form onSubmit = {this.handleLogin}>
                                <FormGroup>
                                    <Label htmlFor = "username">Username</Label>
                                    <Input type = "text" id = "username" name = "username" innerRef = {(input) => this.username = input}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor = "password">Password</Label>
                                    <Input type = "password" id = "password" name = "password" innerRef = {(input) => this.password = input} />
                                </FormGroup>
                                <Button type = "submit" value= "submit" color= "primary">Login</Button>

                            </Form>
                        </ModalBody>
                    </Modal>
                    <div className="container">
                        <div className = "row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Ristornate Con Fusion</h1>
                                <p>We take inspiration from the world's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your.</p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
            </>
        );
    }
}

export default Header;